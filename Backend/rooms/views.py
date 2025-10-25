from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Room, Allocation
from .serializers import RoomSerializer, AllocationSerializer
from .permissions import IsWardenRole

# -------------------------------
# Room CRUD
# -------------------------------
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()  # required for router
    serializer_class = RoomSerializer

    def get_permissions(self):
        """
        Warden: full CRUD
        Students: read-only
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]  # all authenticated can view
        else:
            permission_classes = [IsWardenRole]  # only warden can create/update/delete
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Room.objects.all()
        else:
            # Students see only their allocated room
            allocations = Allocation.objects.filter(student=user, end_date__isnull=True)
            if allocations.exists():
                room_ids = [alloc.room.id for alloc in allocations]
                return Room.objects.filter(id__in=room_ids)
            else:
                return Room.objects.none()


# -------------------------------
# Allocation CRUD
# -------------------------------
class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer

    def get_permissions(self):
        user = self.request.user
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only wardens can modify allocations
            permission_classes = [IsWardenRole]
        else:
            # Students can only read their own allocations
            permission_classes = [permissions.IsAuthenticated]
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Allocation.objects.select_related('room', 'student')
        return Allocation.objects.filter(student=user, end_date__isnull=True)

    def create(self, request, *args, **kwargs):
        """
        Warden creates a new room allocation.
        """
        student_id = request.data.get("student")
        room_id = request.data.get("room")
        start_date = request.data.get("start_date")

        if not all([student_id, room_id, start_date]):
            return Response(
                {"detail": "All fields (student, room, start_date) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prevent duplicate allocations for same student or room
        if Allocation.objects.filter(room_id=room_id, end_date__isnull=True).exists():
            return Response(
                {"detail": "Room is already allocated."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Allocation.objects.filter(student_id=student_id, end_date__isnull=True).exists():
            return Response(
                {"detail": "Student already has an active allocation."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create allocation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(student_id=student_id, room_id=room_id)

        # Mark room as allocated
        Room.objects.filter(id=room_id).update(is_allocated=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
