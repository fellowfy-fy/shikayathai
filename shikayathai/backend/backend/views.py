# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from django.contrib.auth import authenticate
from django.conf import settings
import base64

@api_view(['POST'])
def logout_view(request):
    try:
        print(request)
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CustomLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

def get_userpic_base64(user):
    if user.userpic:
        with open(user.userpic.path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode('utf-8')
    with open(f"{settings.MEDIA_ROOT}/default/userpic.png", "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

class CustomLoginView(ListCreateAPIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = CustomLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'name': user.name,
                    'email': email,
                    'access': str(refresh.access_token),                    
                    'userpic': get_userpic_base64(user)
                })
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)