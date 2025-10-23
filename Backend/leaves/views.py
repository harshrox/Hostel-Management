from rest_framework import viewsets, permissions
from .models import Leave
from .serializers import LeaveSerializer
from .permissions import IsWardenRole

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

    def get_permissions(self):
        """
        Warden: full CRUD
        Student: can create and view their own leaves
        """
        if self.action in ['list', 'retrieve', 'create']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsWardenRole]
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Leave.objects.all()
        else:
            return Leave.objects.filter(student=user)

    def perform_create(self, serializer):
        # Automatically assign the logged-in student
        serializer.save(student=self.request.user)
