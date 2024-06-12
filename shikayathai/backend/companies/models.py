from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            ),
        ]
    )
    rating = models.FloatField(
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(5.0)
        ],
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name
