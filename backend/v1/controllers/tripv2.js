import TripV2 from "../models/TripV2.js";

// Get all trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await TripV2.find().populate("hostId", "name email");
    res.status(200).json({
      status: "success",
      results: trips.length,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get single trip by ID
export const getTripById = async (req, res) => {
  try {
    console.log(req.body);
    const trip = await TripV2.findOne({ trip_slug: req.body.slug }).populate(
      "hostId",
      "name email profile_pic bio social_media_follower social_media_link"
    );

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Trip not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getTripCheckoutData = async (req, res) => {
  try {
    const trip = await TripV2.findOne({ trip_slug: req.body.slug })
      .select("title startDate endDate city coverImages tag_line")
      .populate("hostId", "name profile_pic");
    res.status(200).json({
      status: "success",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
