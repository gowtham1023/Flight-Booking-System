const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  source: String,
  destination: String,
  date: String,
  time: String,
  price: Number
});

module.exports = mongoose.model('Flight', flightSchema);
