from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TravelRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password','email', 'is_staff', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email', ''),
            is_staff=validated_data.get('is_staff', False),
            is_active=validated_data.get('is_active', True)  # Default to True
        )
        return user

class TravelRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelRequest
        fields = '__all__'
        extra_kwargs = {
            'user_id': {'read_only': True},
            'username': {'read_only': True},
        }