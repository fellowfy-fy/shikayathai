# exception_handler.py

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call the default exception handler first to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            response.data['status_code'] = response.status_code
            response.data['detail'] = "Bad request error"
        else:
            # Add any other custom error handling here if needed
            pass

    return response
