from rest_framework import serializers
from .models import *

class TruckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Truck
        fields = ('pk', 'truck_name', 'truck_main_image', 'truck_description', 'truck_price')


    def __init__(self, *args, **kwargs):
        if kwargs.get('data'):
           if kwargs.get('data').get('truck_main_image') == 'undefined':
            self.fields.pop('truck_main_image')
        super(TruckSerializer, self).__init__(*args, **kwargs)
