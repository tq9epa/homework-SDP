import React from 'react';

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ selectedDate, onDateChange, onPreviousDay, onNextDay }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '500px', marginBottom: '10px' }}>
      <button onClick={onPreviousDay}>Previous Day</button>
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={(e) => onDateChange(new Date(e.target.value))}
      />
      <button onClick={onNextDay}>Next Day</button>
    </div>
  );
};

export default CalendarHeader;