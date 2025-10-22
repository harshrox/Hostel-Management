from rest_framework import serializers
from .models import StudentRecord
from accounts.serializers import UserSerializer
from rooms.serializers import RoomSerializer

class StudentRecordSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    room = RoomSerializer(read_only=True)

    class Meta:
        model = StudentRecord
        fields = ['id', 'student', 'room', 'admission_date', 'contact_number', 'emergency_contact', 'notes']
