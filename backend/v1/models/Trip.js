import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: {
    type: [String],
    required: true,
  },
});

const tripHighlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // ask if multiple pics.
    required: true,
  },
});

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // ask if multiple pics.
    required: true,
  },
});

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  image: {
    type: [String], // ask if multiple pics.
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const experinceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  range_of_spots: {
    type: String,
  },
  accommodation: {
    type: String,
  },
  included_meals: {
    type: String,
  },
});

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const amenitySchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const TripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coverVideo:{
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  total_seats: {
    type: Number,
    required: true,
  },
  itinerary: {
    type: [itinerarySchema],
    required: true,
  },
  inclusions: {
    type: [amenitySchema],
    required: true,
  },
  exclusions: {
    type: [amenitySchema],
    required: true,
  },
  add_ons: {
    type: [amenitySchema],
    required: true,
  },
  tripHighlight: {
    type: [tripHighlightSchema],
    required: true,
  },
  accommodation: {
    type: [accommodationSchema],
    required: true,
  },
  room: {
    type: [roomSchema],
    required: true,
  },
  faq: {
    type: [faqSchema],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: false,
  },
  is_published: {
    type: Boolean,
    required: false,
    default: false,
  },
  slug: {
    type: String,
    required: true,
  },
  card_img: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: false,
  },
  early_bird_price: {
    type: Number,
    required: false,
  },
  is_early_bird_price_active: {
    type: Boolean,
    required: false,
  },
  experience: {
    type: experinceSchema,
    required: true,
  },
  home_tag: {
    type: String,
    required: false,
  },
  suggested_sell_price_start: {
    type: Number,
  },
  suggested_sell_price_end: {
    type: Number,
  },
  logo_color: {
    type: String,
  },
  cover_video: {
    type: String,
  },
  cover_video_mob: {
    type: String,
  },
  cover_img: {
    type: String,
  },
  cover_img_mob: {
    type: String,
  },
});

export default mongoose.model("Trip", TripSchema);
