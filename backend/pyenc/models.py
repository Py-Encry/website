from django.db import models

class Image(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images')
    def __str__(self):
        return self.title
    
#class User(models.Model):
#    username = models.CharField(max_length=200)
#    password = models.CharField(max_length=200)
#    def __str__(self):
#        return self.username