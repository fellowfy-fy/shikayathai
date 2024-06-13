# utils.py

from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(user_email, user_name):
    subject = 'Welcome to Our Site'
    message = f'Hi {user_name},\n\nThank you for registering at our site.\n\nBest Regards,\nYour Site Team'
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user_email]
    send_mail(subject, message, email_from, recipient_list)
