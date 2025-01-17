from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.index, name="main_page"),
    path("trucks", include("trucks.urls")),
]
