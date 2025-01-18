from django.urls import include, path

from . import views

urlpatterns = [
    path("trucks", include("trucks.urls")),
]
