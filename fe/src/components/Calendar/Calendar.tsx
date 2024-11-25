import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import AppointmentForm from './AppointmentForm';
import { Appointment, Department, Employee } from './types';

const Calendar: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [popupAppointment, setPopupAppointment] = useState<Appointment | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
    fetchDepartments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/appointments/');
      const data = await response.json();
      const appointmentsData = data.map((appointment: any) => ({
        ...appointment,
        start: new Date(appointment.start_datetime),
        end: new Date(appointment.end_datetime),
      }));
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/departments/');
      const data = await response.json();
      if (Array.isArray(data)) {
        setDepartments(data);
      } else {
        console.error("Expected an array of departments, but got:", data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchEmployees = async (departmentId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/employees/by-department/${departmentId}/`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveAppointment = (appointment: Appointment) => {
    const startHour = appointment.start.getHours();
    const endHour = appointment.end.getHours();

    if (startHour < 6 || endHour > 21) {
      alert("Appointments must be between 6:00 and 21:00.");
      return;
    }

    const payload = {
      ...appointment,
      start_datetime: appointment.start.toISOString(),
      end_datetime: appointment.end.toISOString(),
    };

    const method = isCreating ? 'POST' : 'PUT';
    const url = isCreating
      ? 'http://localhost:8000/api/appointments/'
      : `http://localhost:8000/api/appointments/${appointment.id}/`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (isCreating) {
          setAppointments([...appointments, data]);
        } else {
          setAppointments(appointments.map(a => (a.id === data.id ? data : a)));
        }
        setPopupAppointment(null);
        setIsCreating(false);
      })
      .catch(error => console.error('Error saving appointment:', error));
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    fetch(`http://localhost:8000/api/appointments/${appointmentId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setAppointments(appointments.filter(a => a.id !== appointmentId));
        setPopupAppointment(null);
        setIsCreating(false);
      })
      .catch(error => console.error('Error deleting appointment:', error));
  };

  const handleParticipantRemove = (participantId: number) => {
    if (popupAppointment) {
      setPopupAppointment({
        ...popupAppointment,
        participants: popupAppointment.participants.filter(id => id !== participantId),
      });
    }
  };

  const handleParticipantAdd = (participantId: number) => {
    if (popupAppointment) {
      setPopupAppointment({
        ...popupAppointment,
        participants: [...popupAppointment.participants, participantId],
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CalendarHeader
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        onPreviousDay={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
        onNextDay={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
      />
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <CalendarGrid
          appointments={appointments}
          selectedDate={selectedDate}
          onAppointmentClick={(appointment) => {
            setPopupAppointment(appointment);
            setIsCreating(false);
            fetchEmployees(appointment.departmentId);
            console.log('Selected Department ID:', appointment);
          }}
        />
        {(popupAppointment || isCreating) && (
          <AppointmentForm
            appointment={popupAppointment}
            isCreating={isCreating}
            departments={departments}
            employees={employees}
            onSave={handleSaveAppointment}
            onDelete={handleDeleteAppointment}
            onCancel={() => { setPopupAppointment(null); setIsCreating(false); }}
            onParticipantAdd={handleParticipantAdd}
            onParticipantRemove={handleParticipantRemove}
            fetchEmployees={fetchEmployees}
          />
        )}
      </div>
      <button
        onClick={() => {
          setIsCreating(true);
          setPopupAppointment({
            title: '',
            start: new Date(selectedDate.setHours(6, 0, 0, 0)), // Default start time at 6:00
            end: new Date(selectedDate.setHours(7, 0, 0, 0)),   // Default end time at 7:00
            description: '',
            departmentId: 0,
            participants: [],
          });
        }}
        style={{ marginTop: '10px' }}
      >
        Create New Appointment
      </button>
    </div>
  );
};

export default Calendar;