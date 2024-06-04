# views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings

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

def get_userpic_url(user):
    if user.userpic:
        return f"{settings.MEDIA_URL}{user.userpic}"
    return f"{settings.MEDIA_URL}default/userpic.png"

class CustomLoginView(APIView):
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
                    'userpic': get_userpic_url(user)
                })
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)