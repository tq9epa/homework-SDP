from rest_framework import serializers
from .models import Appointment
from .models import Employee

class AppointmentSerializer(serializers.ModelSerializer):
    employees = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), many=True)

    class Meta:
        model = Appointment
        fields = '__all__'