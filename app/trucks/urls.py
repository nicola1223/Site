from django.urls import path, re_path, register_converter
from . import views

urlpatterns = [
    path('', views.trucks_list, name='truck_list'),
    path('?P<int:pk>')
]
