from django.contrib import admin
from .models import User
from companies.models import Company
from complaints.models import Complaint, Comment, Photo, Document
# Register your models here.
admin.site.register(User)
admin.site.register(Company)
admin.site.register(Complaint)
admin.site.register(Comment)
admin.site.register(Photo)
admin.site.register(Document)