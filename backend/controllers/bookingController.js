const Booking = require('../models/Booking');
const Availability = require('../models/Availability');

// @route   POST /api/bookings/create
exports.createBooking = async (req, res) => {
  const { availabilityId, timeSlot } = req.body;

  try {
    // Find the availability
    const availability = await Availability.findById(availabilityId);
    if (!availability) {
      return res.status(404).json({ msg: 'Availability not found' });
    }

    // Check if time slot is available
    const slotIndex = availability.timeSlots.findIndex(
      slot => 
        slot.startTime === timeSlot.startTime && 
        slot.endTime === timeSlot.endTime && 
        !slot.isBooked
    );

    if (slotIndex === -1) {
      return res.status(400).json({ msg: 'Time slot not available' });
    }

    // Create booking
    const booking = new Booking({
      user: req.user.id,
      barber: availability.barber,
      availability: availabilityId,
      timeSlot
    });

    // Mark time slot as booked
    availability.timeSlots[slotIndex].isBooked = true;
    await availability.save();

    // Save booking
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    let bookings;
    
    // If admin, get all bookings
    if (req.user.role === 'admin') {
      bookings = await Booking.find()
        .populate('user', 'name email')
        .populate('barber', 'name');
    } 
    // If barber, get their bookings
    else if (req.user.role === 'barber') {
      bookings = await Booking.find({ barber: req.user.id })
        .populate('user', 'name email');
    } 
    // If user, get their bookings
    else {
      bookings = await Booking.find({ user: req.user.id })
        .populate('barber', 'name');
    }

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};