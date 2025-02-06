from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import *
from .serializer import *

# Create your views here.
class TruckListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request):
        next_page = 1
        previous_page = 1
        trucks = Truck.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(trucks, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = TruckSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            next_page = data.next_page_number()
        if data.has_previous():
            previous_page = data.previous_page_number()

        return Response({
            'data': serializer.data,
            'count': paginator.count,
            'numpages': paginator.num_pages,
            'nextlink': f'api/trucks/?page={next_page}',
            'prevlink': f'api/trucks/?page={previous_page}',
        })

    @staticmethod
    def post(request):
        serializer = TruckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TruckDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, pk):
        try:
            truck = Truck.objects.get(pk=pk)
        except Truck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TruckSerializer(truck, context={'request': request})
        return Response(serializer.data)

    @staticmethod
    def put(request, pk):
        try:
            truck = Truck.objects.get(pk=pk)
        except Truck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TruckSerializer(truck, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    @staticmethod
    def delete(request, pk):
        try:
            truck = Truck.objects.get(pk=pk)
        except Truck.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        truck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
