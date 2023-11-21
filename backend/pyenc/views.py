from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from django.http import JsonResponse
from .models import Profile
import base64
from django.core.files.base import ContentFile
from pyencry.image_handler import ImageHandler
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer, TokenSerializer
from rest_framework import generics, permissions
import io
from PIL import Image
from uuid import uuid4

# Create your views here.
#@permission_classes([UNAUTHENTICATED_USER])
@authentication_classes([BasicAuthentication])
@api_view(['POST'])
def signup(request):
    user = User.objects.create_user(email=request.data["email"], username=request.data["username"], password=request.data["password"])
    user.save()
    token, created = Token.objects.get_or_create(user=user)
    return JsonResponse({ 
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email})

@authentication_classes([BasicAuthentication])
@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data["username"], password=request.data["password"])
    profile_image = Profile.objects.filter(user=user)
    if user is not None:
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "failure"})
    
@authentication_classes([BasicAuthentication])
@api_view(['POST'])
def change_password(request):
    user = authenticate(username=request.data["username"], password=request.data["password"])
    if user is not None:
        user.set_password(request.data["newPassword"])
        user.save()
        token_user = Token.objects.get(user=user)
        token_user.delete()
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "failure"})
    
@authentication_classes([BasicAuthentication])
@api_view(['POST'])
def change_email(request):
    user = authenticate(username=request.data["username"], password=request.data["password"])
    if user is not None:
        user.email = request.data["newEmail"]
        user.save()
        token_user = Token.objects.get(user=user)
        token_user.delete()
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "failure"})

  
@api_view(['POST'])
def encrypt(request):
    header, data = request.data["base64Image"].split(';base64,')
    image_data = base64.b64decode(data)
    image = ImageHandler.from_base64(image_data)
    image.encode(request.data["data"]["method"], key=request.data["data"]["key"], data=request.data["data"]["message"])
    return JsonResponse({"status": "success", "image": image.to_string().decode('utf-8')})

@api_view(['POST'])
def decrypt(request):
    header, data = request.data["base64Image"].split(';base64,')
    image_data = base64.b64decode(data)
    image = ImageHandler.from_base64(image_data)
    message = image.decode("rail_fence_cipher", key=request.data["data"]["key"])
    return JsonResponse({"status": "success", "message": message})

@authentication_classes([BasicAuthentication])
@permission_classes([permissions.IsAuthenticated])
@api_view(['POST'])
def upload_image(request):
    user = Token.objects.get(key=request.data["token"]).user
    profile = Profile.objects.get(user=user)
    profile.image = decodeDesignImage(request.data["image"])
    profile.save()
    return JsonResponse({"status": "success"})

def decodeDesignImage(data):
    format, imgstr = data.split(';base64,')
    ext = format.split('/')[-1]
    data = base64.b64decode(data.split(';base64,')[1])
    return ContentFile(base64.b64decode(imgstr), name=uuid4().hex + "." + ext)

@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    return JsonResponse({"images": list(images.values())})
    
class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        user = authenticate(username=request.data["username"], password=request.data["password"])
        token, created = Token.objects.get_or_create(user=user)
        profile, created = Profile.objects.get_or_create(user=user)
        print(profile)
        with open(f"media/{profile.image}", "rb") as f:
            encoded_image = base64.b64encode(f.read()).decode('utf-8')
        #print(encoded_image)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email,
            'image': encoded_image
        })
