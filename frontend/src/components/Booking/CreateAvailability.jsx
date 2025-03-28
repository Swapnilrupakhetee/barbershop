import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdminNavigation from '../Navigation/AdminNavigation';

function CreateAvailability() {
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '' }]);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/availability/create', 
        { date, timeSlots },
        { 
          headers: { 
            'x-auth-token': localStorage.getItem('token') 
          } 
        }
      );
      setMessage('Availability created successfully!');
      setDate('');
      setTimeSlots([{ startTime: '', endTime: '' }]);
    } catch (err) {
      setMessage('Failed to create availability');
      console.error(err);
    }
  };



  return (
    <div>
    <AdminNavigation/>
      <h2>Create Availability</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <h3>Time Slots</h3>
        {timeSlots.map((slot, index) => (
          <div key={index}>
            <label>Start Time:</label>
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
              required
            />
            <label>End Time:</label>
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTimeSlot}>
          Add Time Slot
        </button>
        <button type="submit">Create Availability</button>
      </form>
    </div>
  );
}

export default CreateAvailability;