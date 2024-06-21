from django.urls import path
from .views import CompanyDashboardView, CreateCompanyView, ListCompanyView, CompanyDetailView

urlpatterns = [
    path('create/', CreateCompanyView.as_view(), name='create-company'),
    path('dashboard/<int:pk>', CompanyDashboardView.as_view(), name='company-dashboard'),
    path('list/', ListCompanyView.as_view(), name='company-list'),
    path('details/<int:pk>', CompanyDetailView.as_view(), name='details-company'),
]