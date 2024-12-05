import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  amount_paid: {
    type: String,
    required: true,
  },
  booking_status: {
    type: String,
    required: true,
  },
  trip_slug: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Bookings", BookingSchema);
