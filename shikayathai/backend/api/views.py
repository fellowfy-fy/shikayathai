from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer, LoginSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, DestroyAPIView
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
from django.core.mail import send_mail
import random
import string

def send_welcome_email(user_email, user_name):
    subject = 'Welcome to Our Site'
    message = f'Hi {user_name},\n\nThank you for registering at our site.\n\nBest Regards,\nYour Site Team'
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user_email]
    send_mail(subject, message, email_from, recipient_list)


def send_password_email(user_email, password):
    subject = 'Your new account password'
    message = f'Hello,\n\nYour account has been created successfully. Your password is: {password}\n\nPlease change your password after logging in.'
    from_email = 'your_email@example.com'
    recipient_list = [user_email]
    send_mail(subject, message, from_email, recipient_list)


User = get_user_model()


def get_userpic_url(request, user):
    if user.userpic:
        return request.build_absolute_uri(f"{user.userpic.url}")
    return request.build_absolute_uri("default/userpic.png")

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
            'userpic': get_userpic_url(request, user),
        }
        return Response(response, status=status.HTTP_200_OK)

class CreateUserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        email = request.data.get('email')
        if request.data.get('password'):
            password = request.data.get('password')
        else:
            password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        if not name:
            raise ValidationError({'message': 'Username is required.'})
        if not password:
            raise ValidationError({'message': 'Password is required.'})
        if not email:
            raise ValidationError({'message': 'Email is required.'})

        if User.objects.filter(email=email).exists():
            raise ValidationError({'message': 'Username with this email already exists.'})

        # Create the user
        user = User.objects.create_user(name=name, password=password, email=email)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        send_password_email(email, password)

        return Response({'name': user.name, 'access': access_token}, status=status.HTTP_201_CREATED)

class LoginView(ListCreateAPIView):
    permission_classes = [AllowAny]

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
                    'userpic': get_userpic_url(request, user),
                    'access': access_token,
                    'refresh': refresh_token
                })
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
        return response
        
class UserDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        response = Response({'detail': 'Delete successful'}, status=status.HTTP_204_NO_CONTENT)
        user = request.user
        user.delete()
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response