from django.urls import path
from .views import UserDetailUpdateDeleteView, ComplaintDetailUpdateDeleteView, CompanyDetailUpdateDeleteView, CreateComplaintView, CreateCompanyView, ListComplaintsView, CommentListCreateView, ComplaintDetailView

urlpatterns = [
    path("complaints/", CreateComplaintView.as_view(), name="complaint-list"),
    path("companies/", CreateCompanyView.as_view(), name="companies-list"),
    path('users/profile/', UserDetailUpdateDeleteView.as_view(), name='user-detail-update-delete'),
    path('complaints/<int:pk>/', ComplaintDetailView.as_view(), name='complaint-detail-update-delete'),
    path('companies/<int:pk>/', CompanyDetailUpdateDeleteView.as_view(), name='company-detail-update-delete'),
    path("complaints/get/", ListComplaintsView.as_view(), name="complaint-get-list"),
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
]