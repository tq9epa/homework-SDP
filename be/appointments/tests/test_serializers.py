from django.test import TestCase
from appointments.serializers import AppointmentSerializer

class AppointmentSerializerTest(TestCase):
    def setUp(self):
        self.appointment_data = {
            "start_datetime": "2023-10-01T10:00:00Z",
            "end_datetime": "2023-10-01T11:00:00Z",
            "title": "Team Meeting",
            "description": "Discuss project updates",
            "employee": 1  # Assuming an employee with ID 1 exists
        }
        self.serializer = AppointmentSerializer(data=self.appointment_data)

    def test_serializer_valid(self):
        self.assertTrue(self.serializer.is_valid())