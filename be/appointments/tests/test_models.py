from django.test import TestCase
from employees.models import Employee
from departments.models import Department
from appointments.models import Appointment

class AppointmentModelTest(TestCase):
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

    def test_appointment_creation(self):
        self.assertEqual(self.appointment.title, "Team Meeting")
        self.assertEqual(self.appointment.employee.name, "John Doe")