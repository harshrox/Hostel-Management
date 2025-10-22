from rest_framework import viewsets, permissions
from .models import Complaint
from .serializers import ComplaintSerializer
from .permissions import IsWardenRole

class ComplaintViewSet(viewsets.ModelViewSet):
    serializer_class = ComplaintSerializer

    def get_permissions(self):
        """
        Warden: full CRUD
        Student: can create and view their own complaints
        """
        if self.request.user.role == 'WARDEN':
            permission_classes = [IsWardenRole]  # full access
        else:
            # Student can create and view only
            if self.action in ['create', 'list', 'retrieve']:
                permission_classes = [permissions.IsAuthenticated]
            else:
                permission_classes = [permissions.IsAdminUser]  # no delete/update for students
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return Complaint.objects.all()
        return Complaint.objects.filter(student=user)

    def perform_create(self, serializer):
        # Automatically assign current student as complaint owner
        serializer.save(student=self.request.user)
