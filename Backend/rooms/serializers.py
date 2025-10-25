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

    def validate(self, attrs):
        start_date = attrs.get('start_date')
        end_date = attrs.get('end_date')
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError({
                "end_date": "End date cannot be before start date."
            })
        return attrs

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        room_id = validated_data.pop('room_id')
        student = User.objects.get(id=student_id)
        room = Room.objects.get(id=room_id)
        allocation = Allocation.objects.create(student=student, room=room, **validated_data)
        return allocation

    def update(self, instance, validated_data):
        start_date = validated_data.get('start_date', instance.start_date)
        end_date = validated_data.get('end_date', instance.end_date)
        if end_date and end_date < start_date:
            raise serializers.ValidationError({
                "end_date": "End date cannot be before start date."
            })

        # Update fields
        instance.start_date = start_date
        instance.end_date = end_date
        if 'student_id' in validated_data:
            instance.student = User.objects.get(id=validated_data['student_id'])
        if 'room_id' in validated_data:
            instance.room = Room.objects.get(id=validated_data['room_id'])
        instance.save()
        return instance
