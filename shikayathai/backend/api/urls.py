from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserDashboardView, CreateUserView, LoginView, LogoutView, UserDeleteView

urlpatterns = [
    path('profile/', UserDashboardView.as_view(), name='user-dashboard'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", CreateUserView.as_view(), name="register"),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login'),
    path('delete/', UserDeleteView.as_view(), name='user-delete'),
]