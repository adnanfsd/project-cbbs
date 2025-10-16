const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  search: String,
  date: String,
  passengers: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);
