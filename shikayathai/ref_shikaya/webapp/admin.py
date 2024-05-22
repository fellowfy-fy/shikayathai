from django.contrib import admin
from .models import UserProfile, Complaint, Company, UserCompany

admin.site.register(UserProfile)
admin.site.register(Complaint)
admin.site.register(Company)
admin.site.register(UserCompany)

# Register your models here.
