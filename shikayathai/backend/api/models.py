from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import IntegrityError, models

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
    
    def userpic_path(instance, filename):
        return '{}/{}/{}'.format(
            'userpics',
            instance.name,
            "userpic.png")
    
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    userpic = models.ImageField(upload_to=userpic_path, default='default/userpic.png')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email
