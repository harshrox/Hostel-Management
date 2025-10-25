from rest_framework import serializers
from .models import Room, Allocation
from accounts.models import User
from accounts.serializers import UserSerializer


class RoomSerializer(serializers.ModelSerializer):
    allocated_count = serializers.SerializerMethodField()
    is_allocated = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ['id', 'number', 'room_type', 'capacity', 'allocated_count', 'is_allocated']

    def get_allocated_count(self, obj):
        return obj.allocated_count

    def get_is_allocated(self, obj):
        return obj.is_allocated




class AllocationSerializer(serializers.ModelSerializer):
    student_id = serializers.IntegerField(write_only=True)
    room_id = serializers.IntegerField(write_only=True)
    
    # Read-only fields for the frontend table
    student_username = serializers.CharField(source="student.username", read_only=True)
    room_number = serializers.CharField(source="room.number", read_only=True)

    class Meta:
        model = Allocation
        fields = [
            'id',
            'student_username',
            'room_number',
            'start_date',
            'end_date',
            'student_id',
            'room_id',
        ]

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        room_id = validated_data.pop('room_id')
        student = User.objects.get(id=student_id)
        room = Room.objects.get(id=room_id)
        allocation = Allocation.objects.create(student=student, room=room, **validated_data)
        return allocation


