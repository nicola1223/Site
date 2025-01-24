from django.urls import include, path

urlpatterns = [
    path('api/trucks/', include('trucks.urls')),
    path('api/token/', include('users.urls')),
]
