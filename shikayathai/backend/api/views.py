from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer, LoginSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from dotenv import load_dotenv
from rest_framework.views import APIView
import os
from django.conf import settings
from django.contrib.auth import authenticate

User = get_user_model()
load_dotenv()
USERPIC_SITE = os.getenv("USERPIC_SITE")



def get_userpic_url(user):
    if user.userpic:
        return f"{USERPIC_SITE}{user.userpic.url}"
    return f"{USERPIC_SITE}{settings.MEDIA_URL}default/userpic.png"

class UserDashboardView(RetrieveUpdateDestroyAPIView):
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

        response = {
            'name': user.name,
            'email': user.email,
            'userpic': get_userpic_url(user),
        }
        return Response(response, status=status.HTTP_200_OK)

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

class LoginView(ListCreateAPIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            persist = serializer.validated_data.get('persist', False)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                response = Response({
                    'name': user.name,
                    'email': email,          
                    'userpic': get_userpic_url(user),
                    'access': access_token
                })
                if persist:
                    response.set_cookie('access', access_token, httponly=True, secure=True, samesite='None')
                    response.set_cookie('refresh', refresh_token, httponly=True, secure=True, samesite='None')
                else:
                    response.set_cookie('access', access_token, httponly=True, secure=True, samesite='None')
                return response
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        response = Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
        
        
        
        