const Flight = require('../models/Flight');

exports.getFlights = async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
};

exports.addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
