from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import IntegrityError, models

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/photos/<username>/<id_complaint>/<filename> or documents/<username>/<id_complaint>/<filename>
    return '{}/{}/{}/{}'.format(
        'photos' if isinstance(instance, Photo) else 'documents',
        instance.complaint.author.name,
        instance.complaint.id,
        filename
    )

def userpic_path(instance, filename):
    return '{}/{}/{}'.format(
        'userpics',
        instance.name,
        filename)

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        try:
            email = self.normalize_email(email)
            user = self.model(email=email, name=name, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user
        except IntegrityError:
            raise ValueError('A user with that email or name already exists.')

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    userpic = models.ImageField(upload_to=userpic_path, default='default/userpic.png')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

class Company(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class Complaint(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='complaints')
    title = models.CharField(max_length=255)
    description = models.TextField()
    private_description = models.TextField(blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='complaints')
    resolution_rating = models.IntegerField(blank=True, null=True)
    resolution_comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

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