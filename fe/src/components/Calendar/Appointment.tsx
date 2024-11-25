import React from 'react';

interface AppointmentProps {
  appointment: {
    id: number;
    title: string;
    start: Date;
    end: Date;
    description: string;
    departmentId: number;
    participants: number[];
  };
  index: number;
  onClick: (appointment: any) => void;
}

const Appointment: React.FC<AppointmentProps> = ({ appointment, index, onClick }) => {
  const startHour = appointment.start.getHours();
  const endHour = appointment.end.getHours();
  const startMinutes = appointment.start.getMinutes();
  const endMinutes = appointment.end.getMinutes();
  const durationInMinutes = (endHour * 60 + endMinutes) - (startHour * 60 + startMinutes);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${(startHour - 6) * 50 + (startMinutes / 60) * 50}px`,
        height: `${(durationInMinutes / 60) * 50}px`,
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
      onClick={() => onClick(appointment)}
    >
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {appointment.title}
      </span>
    </div>
  );
};

export default Appointment;