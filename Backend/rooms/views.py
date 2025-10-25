from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Room, Allocation
from .serializers import RoomSerializer, AllocationSerializer
from .permissions import IsWardenRole

# -------------------------------
# Room CRUD
# -------------------------------
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsWardenRole]
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Room.objects.all()
        # Students see only their allocated room(s)
        allocations = Allocation.objects.filter(student=user, end_date__isnull=True)
        room_ids = [alloc.room.id for alloc in allocations]
        return Room.objects.filter(id__in=room_ids)


# -------------------------------
# Allocation CRUD
# -------------------------------
class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsWardenRole]  # Only wardens can modify allocations
        else:
            permission_classes = [permissions.IsAuthenticated]  # Students can view their allocations
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Allocation.objects.select_related('room', 'student')
        return Allocation.objects.filter(student=user, end_date__isnull=True)

    def create(self, request, *args, **kwargs):
        student_id = request.data.get("student_id")
        room_id = request.data.get("room_id")
        start_date = request.data.get("start_date")
        end_date = request.data.get("end_date")  # optional

        if not all([student_id, room_id, start_date]):
            return Response(
                {"detail": "All fields (student, room, start_date) are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if student already has an active allocation
        if Allocation.objects.filter(student_id=student_id, end_date__isnull=True).exists():
            return Response(
                {"detail": "This student already has an active allocation."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if room is full
        room = Room.objects.get(id=room_id)
        if room.allocated_count >= room.capacity:
            return Response(
                {"detail": "This room is already full."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create allocation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)