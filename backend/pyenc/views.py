from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from django.http import JsonResponse
from .models import Image
import base64
from django.core.files.base import ContentFile
from pyencry.image_handler import ImageHandler
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
#from rest_framework.permissions import UNAUTHENTICATED_USER
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from knox.auth import TokenAuthentication

# Create your views here.
#@permission_classes([UNAUTHENTICATED_USER])
@authentication_classes([BasicAuthentication])
@api_view(['POST'])
def signup(request):
    user = User.objects.create_user(username=request.data["username"], password=request.data["password"])
    user.save()
    return JsonResponse({"status": "success"})

@authentication_classes([BasicAuthentication])
@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data["username"], password=request.data["password"])
    if user is not None:
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "failure"})

  
@api_view(['POST'])
def encrypt(request):
    header, data = request.data["base64Image"].split(';base64,')
    image_data = base64.b64decode(data)
    image = ImageHandler.from_string(image_data)
    image.encode("rail_fence_cipher", key=request.data["data"]["key"], data=request.data["data"]["message"])
    return JsonResponse({"status": "success", "image": image.to_string()})

@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    return JsonResponse({"images": list(images.values())})
    
