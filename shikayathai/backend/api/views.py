from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import User, Company, Complaint, Comment, Photo, Document
from .serializers import UserSerializer, CompanySerializer, ComplaintSerializer, CommentSerializer, PhotoSerializer, DocumentSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
import base64
from django.contrib.auth import get_user_model
    
def get_userpic_base64(user):
    if user.userpic:
        with open(user.userpic.path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode('utf-8')
    with open(f"{settings.MEDIA_ROOT}/default/userpic.png", "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

class UserDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = self.request.user
        return obj
        
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = authenticate(email=email, password=password)
        refresh = RefreshToken.for_user(user)
        # Custom response
        response = {
            'name': user.name,
            'email': email,                  
            'userpic': get_userpic_base64(user)
        }
        access_token = str(refresh.access_token)
        response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='None')
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

class RefreshAccessTokenView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'detail': 'Refresh token not found'}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            response = Response({
                'access': new_access_token,
                'email': request.user.email,
                'name': request.user.name,
                'userpic': get_userpic_base64(request.user)
            })
            return response
        except Exception as e:
            return Response({'detail': 'Invalid refresh token'}, status=400)