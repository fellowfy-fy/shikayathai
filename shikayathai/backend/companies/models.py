from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
