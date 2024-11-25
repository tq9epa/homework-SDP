from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    @action(detail=False, methods=['get'], url_path='by-department/(?P<department_id>[^/.]+)')
    def by_department(self, request, department_id=None):
        employees = Employee.objects.filter(department_id=department_id)
        serializer = self.get_serializer(employees, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='by-name-or-email')
    def by_name_or_email(self, request):
        name = request.query_params.get('name', None)
        email = request.query_params.get('email', None)

        if name is None and email is None:
            return Response({"error": "At least one of 'name' or 'email' parameters is required."}, status=400)

        filters = {}
        if name is not None:
            filters['name__icontains'] = name
        if email is not None:
            filters['email__icontains'] = email

        employees = Employee.objects.filter(**filters)
        serializer = self.get_serializer(employees, many=True)
        return Response(serializer.data)