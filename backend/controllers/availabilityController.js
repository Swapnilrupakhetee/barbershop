const Availability = require('../models/Availability');

// @route   POST /api/availability/create
exports.createAvailability = async (req, res) => {
  const { date, timeSlots } = req.body;

  // Ensure only barber can set availability
  if (req.user.role !== 'barber') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    // Check if availability already exists for this date
    let availability = await Availability.findOne({ 
      barber: req.user.id, 
      date: new Date(date) 
    });

    if (availability) {
      // Update existing availability
      availability.timeSlots = timeSlots;
      await availability.save();
      return res.json(availability);
    }

    // Create new availability
    availability = new Availability({
      barber: req.user.id,
      date,
      timeSlots
    });

    await availability.save();
    res.status(201).json(availability);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/availability
exports.getAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.find()
      .populate('barber', 'name');

    res.json(availabilities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};