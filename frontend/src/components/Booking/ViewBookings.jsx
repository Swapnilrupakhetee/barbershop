import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../Navigation/AdminNavigation';

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            'x-auth-token': token
          }
        });
        setBookings(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token is invalid or expired
          logout();
          navigate('/login');
        } else {
          setError('Failed to fetch bookings');
          console.error(err);
        }
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, logout, navigate]);

  if (!user) {
    return <p>Please log in to view bookings</p>;
  }

  return (
    <div>
    <AdminNavigation/>
      <h2>My Bookings</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Barber</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{new Date(booking.availability.date).toLocaleDateString()}</td>
                <td>{booking.timeSlot.startTime}</td>
                <td>{booking.timeSlot.endTime}</td>
                <td>{booking.barber.name}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewBookings;