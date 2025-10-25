from rest_framework import serializers
from .models import Complaint
from accounts.serializers import UserSerializer

class ComplaintSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Complaint
        fields = [
            'id', 
            'student', 
            'title', 
            'description', 
            'status', 
            'created_at', 
            'updated_at'
        ]
