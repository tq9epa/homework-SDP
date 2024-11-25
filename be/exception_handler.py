from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # If an exception is handled by DRF, response will not be None
    if response is not None:
        # Customize the response data
        response.data = {
            'error': {
                'type': exc.__class__.__name__,
                'detail': response.data.get('detail', str(exc)),
                'status_code': response.status_code
            }
        }
    else:
        # Handle exceptions not caught by DRF
        response = Response({
            'error': {
                'type': exc.__class__.__name__,
                'detail': str(exc),
                'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR
            }
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response