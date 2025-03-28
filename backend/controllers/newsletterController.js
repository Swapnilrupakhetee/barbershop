const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const nodemailer = require('nodemailer');

// @route   POST /api/newsletter/subscribe
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if already subscribed
    let subscriber = await NewsletterSubscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ msg: 'Already subscribed' });
    }

    // Create new subscriber
    subscriber = new NewsletterSubscriber({ email });
    await subscriber.save();

    res.status(201).json({ msg: 'Successfully subscribed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/newsletter/send
exports.sendNewsletter = async (req, res) => {
  const { subject, body } = req.body;

  // Ensure only admin can send newsletters
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    // Get all active subscribers
    const subscribers = await NewsletterSubscriber.find({ isActive: true });

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send emails to all subscribers
    const emailPromises = subscribers.map(subscriber => 
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: subject,
        html: body
      })
    );

    await Promise.all(emailPromises);

    res.json({ msg: 'Newsletter sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};