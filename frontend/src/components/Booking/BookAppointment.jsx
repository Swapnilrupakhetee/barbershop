import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminNavigation from '../Navigation/AdminNavigation';

function BookAppointment() {
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/availability');
        setAvailabilities(response.data);
      } catch (err) {
        setError('Failed to fetch available time slots');
        console.error(err);
      }
    };

    fetchAvailabilities();
  }, []);

  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
    setSelectedTimeSlot('');
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedAvailability || !selectedTimeSlot) {
      setError('Please select an availability and time slot');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/bookings/create',
        { 
          availabilityId: selectedAvailability,
          timeSlot: JSON.parse(selectedTimeSlot)
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );

      navigate('/bookings');
    } catch (err) {
      setError('Failed to book appointment');
      console.error(err);
    }
  };

  if (!user) {
    return <p>Please log in to book an appointment</p>;
  }

  return (
    <div>
    <AdminNavigation/>
      <h2>Book Appointment</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleBooking}>
        <div>
          <label>Select Date and Barber:</label>
          <select 
            value={selectedAvailability} 
            onChange={handleAvailabilityChange}
            required
          >
            <option value="">Select an availability</option>
            {availabilities.map((availability) => (
              <option 
                key={availability._id} 
                value={availability._id}
              >
                {new Date(availability.date).toLocaleDateString()} - {availability.barber.name}
              </option>
            ))}
          </select>
        </div>

        {selectedAvailability && (
          <div>
            <label>Select Time Slot:</label>
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              required
            >
              <option value="">Select a time slot</option>
              {availabilities
                .find(a => a._id === selectedAvailability)
                ?.timeSlots
                .filter(slot => !slot.isBooked)
                .map((slot, index) => (
                  <option 
                    key={index} 
                    value={JSON.stringify({
                      startTime: slot.startTime, 
                      endTime: slot.endTime
                    })}
                  >
                    {slot.startTime} - {slot.endTime}
                  </option>
                ))
              }
            </select>
          </div>
        )}

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;