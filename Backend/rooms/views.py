from rest_framework import viewsets, permissions
from .models import Room, Allocation
from .serializers import RoomSerializer, AllocationSerializer
from .permissions import IsAdminRole  # import custom permission

# -------------------------------
# Room CRUD
# -------------------------------
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()  # required for router
    serializer_class = RoomSerializer

    def get_permissions(self):
        """
        Admins: full CRUD
        Students: read-only
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]  # all authenticated can view
        else:
            permission_classes = [IsAdminRole]  # only admin role can create/update/delete
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
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
# Allocation CRUD (read-only for students)
# -------------------------------
class AllocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Allocation.objects.all()  # required for router
    serializer_class = AllocationSerializer

    def get_permissions(self):
        """
        Admins: full CRUD (via separate admin interface)
        Students: can only view their own allocations
        """
        if self.request.user.role == 'ADMIN':
            permission_classes = [IsAdminRole]
        else:
            permission_classes = [permissions.IsAuthenticated]  # students can view only their own allocations
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Allocation.objects.all()
        return Allocation.objects.filter(student=user, end_date__isnull=True)
