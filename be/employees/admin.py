from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'position', 'department')
    search_fields = ('name', 'email')
    list_filter = ('position', 'department')