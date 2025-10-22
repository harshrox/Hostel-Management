from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Room, Allocation
from .serializers import RoomSerializer, AllocationSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated]


class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Assign room to the current user if room has availability."""
        room_id = request.data.get('room')
        user = request.user

        if not room_id:
            return Response({"detail": "room field is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response({"detail": "Room does not exist."}, status=status.HTTP_404_NOT_FOUND)

        if room.is_allocated:
            return Response({"detail": "Room is already full."}, status=status.HTTP_400_BAD_REQUEST)

        allocation = Allocation.objects.create(
            student=user,
            room=room,
            start_date=request.data.get('start_date')
        )
        serializer = self.get_serializer(allocation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        """Students see only their allocations, admins see all."""
        user = self.request.user
        if user.is_staff or user.role == 'ADMIN':
            return Allocation.objects.all()
        return Allocation.objects.filter(student=user)
