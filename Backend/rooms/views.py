from rest_framework import viewsets, permissions
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
        user = self.request.user
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsWardenRole]  # Only wardens can modify allocations
        else:
            permission_classes = [permissions.IsAuthenticated]  # Students can read their own allocations
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Allocation.objects.select_related('room', 'student')
        return Allocation.objects.filter(student=user, end_date__isnull=True)

