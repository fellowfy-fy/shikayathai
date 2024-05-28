from django.urls import path
from . import views

urlpatterns = [
    path("complaints/", views.CreateComplaintView.as_view(), name="complaint-list"),
    path("companies/", views.CreateCompanyView.as_view(), name="companies-list")
]