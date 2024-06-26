from django.db import models
from api.models import User
from companies.models import Company
from django.utils import timezone

def user_directory_path(instance, filename):
    return '{}/{}/{}/{}'.format(
        'photos' if isinstance(instance, Photo) else 'documents',
        instance.complaint.author.name,
        instance.complaint.id,
        filename
    )

class Complaint(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='complaints')
    title = models.CharField(max_length=255)
    description = models.TextField()
    private_description = models.TextField(blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='complaints')
    resolution_rating = models.IntegerField(blank=True, null=True)
    resolution_comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return self.title
    
    def update_company_rating(self):
        if self.resolution_rating is not None:
            # Calculate the average rating
            all_ratings = Complaint.objects.filter(company=self.company, resolution_rating__isnull=False).values_list('resolution_rating', flat=True)
            if all_ratings:
                average_rating = sum(all_ratings) / len(all_ratings)
                self.company.rating = average_rating
                self.company.save()

class Comment(models.Model):
    text = models.TextField()
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:20]
    
class Photo(models.Model):
    image = models.ImageField(upload_to=user_directory_path)
    complaint = models.ForeignKey(Complaint, related_name='photos', on_delete=models.CASCADE)

class Document(models.Model):
    file = models.FileField(upload_to=user_directory_path)
    complaint = models.ForeignKey(Complaint, related_name='documents', on_delete=models.CASCADE)