from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    # Include password field for registration; write_only=True ensures it is never returned
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'password']

    # Override create() to hash password automatically
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # hashes password properly
        user.save()
        return user

    # Override update() in case you want to allow password changes
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
