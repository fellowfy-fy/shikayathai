# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
import base64

class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response

class CustomLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    persist = serializers.BooleanField()

User = get_user_model()


def get_userpic_url(user):
    if user.userpic:
        return f"https://127.0.0.1:8000{user.userpic.url}"
    return f"https://127.0.0.1:8000{settings.MEDIA_URL}default/userpic.png"

class CustomLoginView(ListCreateAPIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = CustomLoginSerializer(data=request.data)
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
    


