from django.db import models
from departments.models import Department

class Employee(models.Model):
    POSITION_CHOICES = [
        ('employee', 'Employee'),
        ('manager', 'Manager'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')

    def __str__(self):
        return self.name