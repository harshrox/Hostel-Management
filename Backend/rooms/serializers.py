from rest_framework import serializers
from .models import Room, Allocation
from accounts.serializers import UserSerializer

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'number', 'room_type', 'capacity']

class AllocationSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)

    class Meta:
        model = Allocation
        fields = ['id', 'student', 'room', 'start_date', 'end_date']