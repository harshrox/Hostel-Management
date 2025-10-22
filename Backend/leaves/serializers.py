from rest_framework import serializers
from .models import Leave
from accounts.serializers import UserSerializer

class LeaveSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)

    class Meta:
        model = Leave
        fields = ['id', 'student', 'start_date', 'end_date', 'reason', 'status', 'applied_at']
