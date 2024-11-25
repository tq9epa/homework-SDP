# tests.py
from django.test import TestCase
from .models import Appointment

class AppointmentModelTest(TestCase):
    def test_string_representation(self):
        appointment = Appointment(title="Meeting")
        self.assertEqual(str(appointment), "Meeting")