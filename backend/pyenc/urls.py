from django.urls import path

from . import views

urlpatterns = [
    path("", views.encrypt, name="encrypt"),
    path("decrypt/", views.decrypt, name="decrypt"),
    path("get_images/", views.get_images, name="get_images"),
    path("login/", views.login, name="login"),
    path("signup/", views.signup, name="signup"),
]
