import mongoose from "mongoose";
import User from "./User.js";

const icon_enum = [
  "Location",
  "Clock",
  "GroupSize",
  "Meals",
  "Activity",
  "Transport",
  "Building",
];

const TripV2Schema = new mongoose.Schema({
  coverImages: [String],
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  title: String,
  trip_slug: String,
  coverIcon: {
    type: String,
    required: false,
  },
  price: Number,
  currency: String,
  tag_line: String,
  city: String,
  state: String,
  startDate: Date,
  endDate: Date,
  groupSize: String,
  mealsIncluded: String,
  description: String,

  spotlightEvents: [
    {
      title: String,
      image: String,
    },
  ],

  inclusions: [
    {
      title: String,
      description: String,
      icon: {
        type: String,
        enum: icon_enum,
      },
    },
  ],
  exclusions: [
    {
      title: String,
      description: String,
      icon: {
        type: String,
        enum: icon_enum,
      },
    },
  ],
  addOns: [
    {
      title: String,
      description: String,
      icon: {
        type: String,
        enum: icon_enum,
      },
    },
  ],

  accommodations: [
    {
      title: String,
      description: String,
      images: [String],
    },
  ],

  faqs: {
    experience: [
      {
        question: String,
        answer: String,
      },
    ],
    general: [
      {
        question: String,
        answer: String,
      },
    ],
  },

  itinerary: [
    {
      dayNumber: Number,
      title: String,
      activities: [
        {
          icon: {
            type: String,
            enum: icon_enum,
          },
          title: String,
          description: String,
          images: [
            {
              url: String,
              description: String,
            },
          ],
        },
      ],
    },
  ],
  is_published: Boolean,
});

export default mongoose.model("TripV2", TripV2Schema);
