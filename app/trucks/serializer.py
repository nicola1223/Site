from rest_framework import serializers
from .models import *

class TruckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Truck
        fields = ('pk', 'truck_name', 'truck_main_image', 'truck_description', 'truck_price')

