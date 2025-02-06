from django.urls import path
from . import views
from .views import TruckListView, TruckDetailView

urlpatterns = [
    path('', TruckListView.as_view(), name='truck_list'),
    path('<int:pk>/', TruckDetailView.as_view(), name='truck_detail')
]
