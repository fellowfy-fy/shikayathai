from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings

class CustomAccountAdapter(DefaultAccountAdapter):

    def get_login_redirect_url(self, request):
        # Return the URL you want to redirect to after login
        return 'http://localhost:5173/'
