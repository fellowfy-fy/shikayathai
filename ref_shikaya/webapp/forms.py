from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Complaint

class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')



class ComplaintForm(forms.ModelForm):
    company_name = forms.CharField()

    class Meta:
        model = Complaint
        fields = ['title','text', 'rating', 'company_name', 'image', 'video']
        exclude = ['company']