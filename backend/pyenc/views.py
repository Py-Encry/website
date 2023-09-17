from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import Image
import base64
from django.core.files.base import ContentFile



# Create your views here.
@api_view(['POST'])
def encrypt(request):
    header, data = request.data["base64Image"].split(';base64,')
    image_data = base64.b64decode(data)
    with open("images/test.png", "wb") as image_file:
        image_file.write(image_data)
   
    return JsonResponse({"status": "success"})

@api_view(['GET'])
def get_images(request):
    images = Image.objects.all()
    return JsonResponse({"images": list(images.values())})
    
