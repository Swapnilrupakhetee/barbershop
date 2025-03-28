import React, { useState } from 'react';
import axios from 'axios';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/newsletter/subscribe', { email });
      setMessage('Successfully subscribed!');
      setEmail('');
    } catch (err) {
      setMessage('Subscription failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Subscribe to Newsletter</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default Subscribe;