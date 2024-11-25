import React from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Appointment Calendar</h1>
      </header>
      <main className="App-main">
        <Calendar />
      </main>
    </div>
  );
}

export default App;