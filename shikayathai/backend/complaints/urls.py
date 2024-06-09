from django.urls import path
from .views import ComplaintAndCompanyCreateView, ComplaintDashboardView, ComplaintDetailView, ListComplaintsView, CommentCreateView, CommentListView

urlpatterns = [
    path('create/', ComplaintAndCompanyCreateView.as_view(), name='create-complaint'),
    path('dashboard/', ComplaintDashboardView.as_view(), name='complaint-dashboard'),
    path('details/<int:pk>', ComplaintDetailView.as_view(), name='create-company'),
    path('list/', ListComplaintsView.as_view(), name='create-company'),
    path('comments/create/', CommentCreateView.as_view(), name='create-company'),
    path('comments/list/', CommentListView.as_view(), name='create-company'),
]