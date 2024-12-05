import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
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
  instagram_handle: {
    type: String,
    required: false,
  },
});

const Leads = new mongoose.Schema({
  leads: {
    type: [LeadSchema],
    required: true,
  },
  trip_slug: {
    type: String,
    required: true,
  },
  is_contacted: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model("Leads", Leads);
