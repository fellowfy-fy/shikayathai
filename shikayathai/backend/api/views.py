from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import User, Company, Complaint, Comment, Photo, Document
from .serializers import UserSerializer, CompanySerializer, ComplaintSerializer, CommentSerializer, PhotoSerializer, DocumentSerializer, UserUpdateSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from dotenv import load_dotenv
import os
from django.conf import settings

load_dotenv()
USERPIC_SITE = os.getenv("USERPIC_SITE")

def get_userpic_url(user):
    if user.userpic:
        return f"{USERPIC_SITE}{user.userpic.url}"
    return f"{USERPIC_SITE}{settings.MEDIA_URL}default/userpic.png"

class UserDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        # Handle password update separately
        if 'password' in data and data['password']:
            password = data.pop('password')
            if isinstance(password, list):
                password = password[0]
            instance.password = make_password(password)

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Fetch the updated user data
        user = self.get_object()
        userpic_url = user.userpic.url if user.userpic else None

        response = {
            'name': user.name,
            'email': user.email,
            'userpic': get_userpic_url(user),
        }
        return Response(response, status=status.HTTP_200_OK)

class ComplaintDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can update or delete their own complaints
        return Complaint.objects.filter(author=self.request.user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ComplaintDetailView(RetrieveAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny]

class CompanyDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]  # Adjust permissions based on your app's requirements

    def get_queryset(self):
        return Company.objects.all()

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class CreateUserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        password = request.data.get('password')
        email = request.data.get('email')
        if not name:
            raise ValidationError({'username': 'Username is required.'})
        if not password:
            raise ValidationError({'password': 'Password is required.'})
        if not email:
            raise ValidationError({'email': 'Email is required.'})

        # Check if user already exists
        if User.objects.filter(name=name).exists():
            raise ValidationError({'username': 'Username already exists.'})

        # Create the user
        user = User.objects.create_user(name=name, password=password, email=email)

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    
class CreateComplaintView(ListCreateAPIView): 
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)  # Needed for file uploads

    def get_queryset(self):
        return Complaint.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
            
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

class ListComplaintsView(ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Complaint.objects.all()

class CommentListCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
User = get_user_model()

class RefreshAccessTokenView(TokenRefreshView):
    
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({'detail': 'Refresh token not found'}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            response = Response({
                'access': new_access_token,
            })
            return response
        except Exception as e:
            return Response({'detail': 'Invalid refresh token'}, status=400)