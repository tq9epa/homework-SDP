from rest_framework import viewsets
from .models import Department
from .serializers import DepartmentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from employees.serializers import EmployeeSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    @action(detail=True, methods=['get'])
    def employees(self, request, pk=None):
        department = self.get_object()
        employees = department.employees.all()  # Use the related name from the Employee model
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)