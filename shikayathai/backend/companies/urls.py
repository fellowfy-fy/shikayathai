from django.urls import path
from .views import CompanyDashboardView, CreateCompanyView

urlpatterns = [
    path('create/', CreateCompanyView.as_view(), name='create-company'),
    path('dashboard/', CompanyDashboardView.as_view(), name='company-dashboard'),
]