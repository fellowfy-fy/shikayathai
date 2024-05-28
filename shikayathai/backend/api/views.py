from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, Company, Complaint, Comment, Photo, Document
from .serializers import UserSerializer, CompanySerializer, ComplaintSerializer, CommentSerializer, PhotoSerializer, DocumentSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class CreateComplaintView(generics.ListCreateAPIView): 
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Complaint.objects.filter(author = self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            


class CreateCompanyView(generics.ListCreateAPIView): 
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Company.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
            
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)