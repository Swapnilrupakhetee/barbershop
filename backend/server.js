const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const app = express();

const { 
  authRouter, 
  newsletterRouter, 
  availabilityRouter, 
  bookingRouter 
} = require('./routes/routes');



// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));