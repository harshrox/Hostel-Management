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
    # For read (GET) requests → show full student info
    student = UserSerializer(read_only=True)
    # For write (POST/PUT) requests → accept student and room IDs
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='STUDENT'), source='student', write_only=True
    )
    room_id = serializers.PrimaryKeyRelatedField(
        queryset=Room.objects.all(), source='room', write_only=True
    )

    class Meta:
        model = Allocation
        fields = ['id', 'student', 'student_id', 'room', 'room_id', 'start_date', 'end_date']
