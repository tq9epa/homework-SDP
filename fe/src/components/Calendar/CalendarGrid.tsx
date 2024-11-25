import React from 'react';
import { Appointment } from './types';

interface CalendarGridProps {
  appointments: Appointment[];
  selectedDate: Date;
  onAppointmentClick: (appointment: Appointment) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ appointments, selectedDate, onAppointmentClick }) => {
  const appointmentsForDay = appointments.filter(appointment =>
    appointment.start && appointment.start.toDateString() === selectedDate.toDateString()
  );

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '10px', textAlign: 'right' }}>
        {Array.from({ length: 16 }).map((_, index) => (
          <div key={index} style={{ height: '50px', lineHeight: '50px' }}>
            {index + 6}:00
          </div>
        ))}
      </div>
      <div style={{ width: '500px', border: '1px solid #ccc', padding: '10px', position: 'relative', height: '800px' }}>
        <div style={{ position: 'relative', height: '800px' }}>
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} style={{ height: '50px', borderBottom: '1px solid #eee', position: 'relative' }}>
              {/* This div represents the hour line */}
            </div>
          ))}
          {appointmentsForDay.map((appointment, index) => (
            <div
              key={appointment.id}
              style={{
                position: 'absolute',
                top: `${(appointment.start.getHours() - 6) * 50 + (appointment.start.getMinutes() / 60) * 50}px`,
                height: `${((appointment.end.getHours() - appointment.start.getHours()) * 60 + (appointment.end.getMinutes() - appointment.start.getMinutes())) / 60 * 50}px`,
                width: '100%',
                backgroundColor: 'lightblue',
                border: '1px solid blue',
                boxSizing: 'border-box',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1 + index,
              }}
              onClick={() => onAppointmentClick(appointment)}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {appointment.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;