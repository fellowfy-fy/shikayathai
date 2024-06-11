from django.urls import path
from .views import ComplaintAndCompanyCreateView, ComplaintDashboardView, ComplaintDetailView, ListComplaintsView, CommentCreateView, CommentListView

urlpatterns = [
    path('create/', ComplaintAndCompanyCreateView.as_view(), name='create-complaint'),
    path('dashboard/', ComplaintDashboardView.as_view(), name='complaint-dashboard'),
    path('details/<int:pk>', ComplaintDetailView.as_view(), name='details-complaint'),
    path('list/', ListComplaintsView.as_view(), name='list-complaints'),
    path('comments/create/', CommentCreateView.as_view(), name='comment-create'),
    path('comments/list/', CommentListView.as_view(), name='comment-list'),
]