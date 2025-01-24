from django.urls import include, path

from . import views

urlpatterns = [
    path('api/trucks/', include('trucks.urls')),
    path('api/token/', include('auth.urls')),
]
