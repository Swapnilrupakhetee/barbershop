import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminNavigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#f0f0f0',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link 
          to="/bookings" 
          style={{
            marginRight: '15px', 
            textDecoration: 'none', 
            color: 'black'
          }}
        >
          My Bookings
        </Link>
        <Link 
          to="/booking/create" 
          style={{
            marginRight: '15px', 
            textDecoration: 'none', 
            color: 'black'
          }}
        >
          Book Appointment
        </Link>
        <Link 
          to="/availability/create" 
          style={{
            marginRight: '15px', 
            textDecoration: 'none', 
            color: 'black'
          }}
        >
          Create Availability
        </Link>
        <Link 
          to="/newsletter/subscribe" 
          style={{
            marginRight: '15px', 
            textDecoration: 'none', 
            color: 'black'
          }}
        >
          Newsletter
        </Link>
        <Link 
        to="/newsletter/send" 
        style={{
          marginRight: '15px', 
          textDecoration: 'none', 
          color: 'black'
        }}
      >
       Send Newsletter
      </Link>
      </div>
      <button 
        onClick={handleLogout}
        style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavigation;