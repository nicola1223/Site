from django.urls import path
from . import views

urlpatterns = [
    path('', views.trucks_list, name='truck_list'),
    path('<int:pk>/', views.trucks_detail, name='truck_detail')
]
