from rest_framework import viewsets, permissions
from .models import StudentRecord
from .serializers import StudentRecordSerializer
from .permissions import IsWardenRole

class StudentRecordViewSet(viewsets.ModelViewSet):
    queryset = StudentRecord.objects.all()
    serializer_class = StudentRecordSerializer

    def get_permissions(self):
        """
        Warden: full CRUD
        Student: can only view their own record
        """
        if self.action in ['list', 'create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsWardenRole]
        else:  # retrieve
            permission_classes = [permissions.IsAuthenticated]
        return [perm() for perm in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'WARDEN':
            return StudentRecord.objects.all()
        return StudentRecord.objects.filter(student=user)

    def perform_create(self, serializer):
        # Only warden can create a record for a student
        serializer.save()
