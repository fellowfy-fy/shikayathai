"""
URL configuration for shikayathai project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from webapp import views
from django.contrib.auth.views import LoginView
from django.contrib.auth.views import LogoutView
import debug_toolbar


urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path('test/', views.test),
    path('admin/', admin.site.urls),
    path('signup/', views.signup, name='signup'),
    path('login/', LoginView.as_view(template_name='login.html', redirect_authenticated_user=True), name='login'),
    path('thank-you/', views.thank_you, name='thank_you'),
    path('accounts/profile/', views.profile, name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('home/', views.thank_you, name='home'),
    path('add-complaint/', views.add_complaint, name='add_complaint'),
    path('companies/', views.company_list, name='company_list'),
    path('companies/', views.company_list, name='company_list'),
    path('complaints/', views.complaint_list, name='complaint_list'),
    path('accounts/', include('allauth.urls')),
    path('<slug:company_slug>/<slug:complaint_slug>/', views.complaint_detail, name='complaint_detail'),
    path('<slug:slug>/', views.company_detail, name='company_detail'),


]
