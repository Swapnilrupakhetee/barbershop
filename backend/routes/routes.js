const express = require('express');
const { 
  signup, 
  login 
} = require('../controllers/authController');
const { 
  subscribe, 
  sendNewsletter 
} = require('../controllers/newsletterController');
const { 
  createAvailability, 
  getAvailability 
} = require('../controllers/availabilityController');
const { 
  createBooking, 
  getBookings 
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Auth Routes
const authRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);

// Newsletter Routes
const newsletterRouter = express.Router();
newsletterRouter.post('/subscribe', subscribe);
newsletterRouter.post('/send', auth, sendNewsletter);

// Availability Routes
const availabilityRouter = express.Router();
availabilityRouter.post('/create', auth, createAvailability);
availabilityRouter.get('/', getAvailability);

// Booking Routes
const bookingRouter = express.Router();
bookingRouter.post('/create', auth, createBooking);
bookingRouter.get('/', auth, getBookings);

module.exports = {
  authRouter,
  newsletterRouter,
  availabilityRouter,
  bookingRouter
};