const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
    passengerName: String,
    email: String,
    phone: String,
    seats: [String],
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
