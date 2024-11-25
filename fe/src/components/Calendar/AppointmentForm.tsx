import React, { useState, useEffect } from 'react';
import { Appointment, Department, Employee } from './types';

interface AppointmentFormProps {
  appointment: Appointment | null;
  isCreating: boolean;
  departments: Department[];
  employees: Employee[];
  onSave: (appointment: Appointment) => void;
  onDelete: (appointmentId: number) => void;
  onCancel: () => void;
  onParticipantAdd: (participantId: number) => void;
  onParticipantRemove: (participantId: number) => void;
  fetchEmployees: (departmentId: number) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  isCreating,
  departments,
  employees,
  onSave,
  onDelete,
  onCancel,
  onParticipantAdd,
  onParticipantRemove,
  fetchEmployees,
}) => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(appointment?.departmentId || null);

  useEffect(() => {
    if (selectedDepartmentId !== null && !isNaN(selectedDepartmentId)) {
      console.log('Fetching employees for department ID:', selectedDepartmentId);
      fetchEmployees(selectedDepartmentId);
    }
  }, [selectedDepartmentId]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const departmentId = parseInt(e.target.value);
    if (!isNaN(departmentId)) {
      setSelectedDepartmentId(departmentId);
    }
  };

  return (
    <div style={{ marginLeft: '20px', backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', zIndex: 1000 }}>
      <h3>{isCreating ? 'Create New Appointment' : 'Edit Appointment'}</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const participants = appointment ? appointment.participants : [];
        const newAppointment: Appointment = {
          id: appointment?.id,
          title: (form.elements.namedItem('title') as HTMLInputElement).value,
          start: new Date((form.elements.namedItem('start') as HTMLInputElement).value),
          end: new Date((form.elements.namedItem('end') as HTMLInputElement).value),
          description: (form.elements.namedItem('description') as HTMLInputElement).value,
          departmentId: selectedDepartmentId || 0,
          participants: participants,
        };
        onSave(newAppointment);
      }}>
        <div>
          <label>Title: <input name="title" defaultValue={appointment?.title || ''} required /></label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>Start: <input name="start" type="datetime-local" defaultValue={appointment ? appointment.start.toISOString().slice(0, 16) : ''} required /></label>
          <label>End: <input name="end" type="datetime-local" defaultValue={appointment ? appointment.end.toISOString().slice(0, 16) : ''} required /></label>
        </div>
        <div>
          <label>Description: <textarea name="description" defaultValue={appointment?.description || ''} required /></label>
        </div>
        <div>
          <label>Department: 
            <select name="department" onChange={handleDepartmentChange} defaultValue={appointment?.departmentId || ''} required>
              <option value="" disabled>Select a department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Participants:</label>
          <ul>
            {appointment?.participants.map(participantId => {
              const participant = employees.find(emp => emp.id === participantId);
              return participant ? (
                <li key={participant.id}>
                  {participant.name}
                  <button type="button" onClick={() => onParticipantRemove(participant.id)}>Remove</button>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div>
          <select onChange={(e) => {
            const participantId = parseInt(e.target.value);
            if (!appointment?.participants.includes(participantId)) {
              onParticipantAdd(participantId);
            }
          }}>
            <option value="" disabled>Select a participant</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button type="submit">{isCreating ? 'Create' : 'Save'}</button>
          {!isCreating && appointment?.id !== undefined && (
            <button type="button" onClick={() => onDelete(appointment.id!)}>Delete</button>
          )}
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;