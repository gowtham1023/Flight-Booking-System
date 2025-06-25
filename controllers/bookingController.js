const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('flight');
  res.json(bookings);
};

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ user: req.user.id, flight: req.body.flightId });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
