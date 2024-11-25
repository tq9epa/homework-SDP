from django.contrib import admin
from django.urls import path, include
from views import home  # Import the home view

urlpatterns = [
    path('', home, name='home'),  # Add this line for the root URL
    path('api/appointments/', include('appointments.urls')),  # Unique path for appointments
    path('api/employees/', include('employees.urls')),  # Unique path for employees
    path('api/departments/', include('departments.urls')),  # Unique path for departments
]