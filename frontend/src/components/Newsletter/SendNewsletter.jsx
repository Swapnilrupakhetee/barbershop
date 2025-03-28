import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function SendNewsletter() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/newsletter/send', 
        { subject, body },
        { 
          headers: { 
            'x-auth-token': localStorage.getItem('token') 
          } 
        }
      );
      setMessage('Newsletter sent successfully!');
      setSubject('');
      setBody('');
    } catch (err) {
      setMessage('Failed to send newsletter');
      console.error(err);
    }
  };

  // Only allow admins to send newsletters
  

  return (
    <div>
      <h2>Send Newsletter</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Newsletter</button>
      </form>
    </div>
  );
}

export default SendNewsletter;