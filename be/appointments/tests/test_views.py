from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from employees.models import Employee
from departments.models import Department
from appointments.models import Appointment

class AppointmentAPITest(APITestCase):
    def setUp(self):
        self.department = Department.objects.create(name="HR", description="Human Resources")
        self.employee = Employee.objects.create(
            name="John Doe",
            email="john.doe@example.com",
            position="employee",
            department=self.department
        )
        self.appointment = Appointment.objects.create(
            start_datetime="2023-10-01T10:00:00Z",
            end_datetime="2023-10-01T11:00:00Z",
            title="Team Meeting",
            description="Discuss project updates",
            employee=self.employee
        )
        self.url = reverse('appointment-list')

    def test_get_appointments(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Team Meeting")