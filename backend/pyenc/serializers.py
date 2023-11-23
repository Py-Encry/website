from rest_framework import serializers
from .models import Profile
from rest_framework.authtoken.models import Token

class ProfileSerializer(serializers.ModelSerializer):
    #image = Base64ImageField()
    #
    #def update(self, instance, validated_data):
    #    instance.image = validated_data.get('image', instance.image)
    #    instance.save()
    #    return instance

    class Meta:
        model = Profile
        fields = ('user', 'image')  # Add other fields as needed

class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user_id')