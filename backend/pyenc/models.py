from django.db import models
from django.contrib.auth.models import User
from drf_extra_fields.fields import Base64ImageField
from rest_framework.authtoken.models import Token

class Image(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images')
    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True) # Delete profile when user is deleted
    image = models.ImageField(default='default.jpg', upload_to='profile_pics/')
    
#class User(models.Model):
#    username = models.CharField(max_length=200)
#    password = models.CharField(max_length=200)
#    def __str__(self):
#        return self.username