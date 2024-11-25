from django.db import models
from employees.models import Employee

class Appointment(models.Model):
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    employees = models.ManyToManyField(Employee, related_name='appointments')

    def __str__(self):
        return f"{self.title} ({self.start_datetime} - {self.end_datetime})"