from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)
    manager = models.ForeignKey('employees.Employee', on_delete=models.SET_NULL, null=True, related_name='managed_departments')
    description = models.TextField()

    def __str__(self):
        return self.name