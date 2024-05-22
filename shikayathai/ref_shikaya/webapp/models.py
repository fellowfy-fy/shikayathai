from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

class Company(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(null=False, unique=True)

    description = models.TextField()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    

class UserCompany(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    class Meta:
        unique_together = ('user', 'company')


class Complaint(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    
    slug = models.SlugField(null=False, unique=True)

    rating = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey('Company', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    image = models.ImageField(upload_to='photos/', null=True, blank=True)
    video = models.FileField(upload_to='complaint_videos/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if the object is being created
            self.slug = slugify(self.title)
            unique_slug = self.slug
            num = 1
            while Complaint.objects.filter(slug=unique_slug).exists():
                unique_slug = '{}-{}'.format(self.slug, num)
                num += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title



# Create your models here.
