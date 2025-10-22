from rest_framework import viewsets, permissions
from .models import StudentRecord
from .serializers import StudentRecordSerializer

class StudentRecordViewSet(viewsets.ModelViewSet):
    queryset = StudentRecord.objects.all()
    serializer_class = StudentRecordSerializer
    permission_classes = [permissions.IsAuthenticated]
