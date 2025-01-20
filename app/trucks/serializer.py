from rest_framework import serializers
from .models import *

class TruckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Truck
        fields = ('pk', 'truck_name', 'truck_main_image', 'truck_description', 'truck_price')

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.truck_main_image:
            representation['truck_main_image'] = f'http://localhost:8000{instance.truck_main_image.url}'
        else:
            representation['truck_main_image'] = ''

        return representation
