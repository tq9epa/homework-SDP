import os
import django
from django.utils import timezone

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings')

# Initialize Django
django.setup()

# Import models after setting up Django
from departments.models import Department
from employees.models import Employee
from appointments.models import Appointment

# Get today's date with timezone
today = timezone.now()

# Create a department
dept = Department.objects.create(name="Engineering", description="Engineering Department")

# Create employees
emp1 = Employee.objects.create(name="Alice Smith", email="alice@example.com", position="employee", department=dept)
emp2 = Employee.objects.create(name="Bob Johnson", email="bob@example.com", position="employee", department=dept)

# Create appointments with overlapping times for today
Appointment.objects.create(
    title="Project Meeting",
    description="Discuss project milestones",
    start_datetime=today.replace(hour=9, minute=0, second=0, microsecond=0),
    end_datetime=today.replace(hour=10, minute=0, second=0, microsecond=0),
    employee=emp1
)

Appointment.objects.create(
    title="Team Sync",
    description="Weekly team sync-up",
    start_datetime=today.replace(hour=9, minute=30, second=0, microsecond=0),
    end_datetime=today.replace(hour=10, minute=30, second=0, microsecond=0),
    employee=emp2
)

Appointment.objects.create(
    title="Client Call",
    description="Call with client",
    start_datetime=today.replace(hour=10, minute=0, second=0, microsecond=0),
    end_datetime=today.replace(hour=11, minute=0, second=0, microsecond=0),
    employee=emp1
)

Appointment.objects.create(
    title="Design Review",
    description="Review design documents",
    start_datetime=today.replace(hour=10, minute=30, second=0, microsecond=0),
    end_datetime=today.replace(hour=11, minute=30, second=0, microsecond=0),
    employee=emp2
)