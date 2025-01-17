from django.db import models

# Create your models here.
class Truck(models.Model):
    truck_name = models.CharField(max_length=30)
    truck_image = models.ImageField(upload_to="truck_photos", null=True)
    truck_description = models.TextField(null=True)
    truck_price = models.FloatField()

    def __str__(self):
        return f"{self.truck_name}"