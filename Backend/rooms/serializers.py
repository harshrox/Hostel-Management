from rest_framework import serializers
from .models import Room, Allocation
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
    student = UserSerializer(read_only=True)

    class Meta:
        model = Allocation
        fields = ['id', 'student', 'room', 'start_date', 'end_date']
