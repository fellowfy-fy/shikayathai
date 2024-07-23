from django.db.models import Q
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .serializers import CompanySerializer
from .models import Company

class CompanyDashboardView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Company.objects.all()

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class CreateCompanyView(ListCreateAPIView): 
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Company.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class ListCompanyView(ListAPIView): 
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Company.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(email__icontains=search_query) |
                Q(website__icontains=search_query) |
                Q(phone__icontains=search_query)
            )
        return queryset

class CompanyDetailView(RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]
