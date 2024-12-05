import Trip from "../models/Trip.js";
import User from "../models/User.js";
import Bookings from "../models/Bookings.js";

const getSlug = async (title) => {
  let slug = title.replaceAll(" ", "-");
  const trip = await Trip.findOne({ slug: slug });
  const count = await Trip.countDocuments();

  if (trip) {
    slug = slug + "-" + String(count + 1);
    return slug;
  }
  return slug;
};

export async function CreateTrip(req, res, next) {
  try {
    const {
      title,
      description,
      // host,
      images,
      start_date,
      end_date,
      cost_price,
      total_seats,
      itinerary,
      inclusions,
      exclusions,
      add_ons,
      tripHighlight,
      accommodation,
      room,
      faq,
      tags,
      location,
      experience,
      destination,
      card_img,
      currency,
      home_tag,
      suggested_sell_price_start,
      suggested_sell_price_end,
      new_faq,
      logo_color,
      cover_video,
      cover_img,
      cover_img_mob,
      cover_video_mob,
    } = req.body;
    const slug = await getSlug(title);
    const is_published = false;
    const newTrip = new Trip({
      title,
      description,
      // host,
      images,
      start_date,
      end_date,
      cost_price,
      total_seats,
      itinerary,
      inclusions,
      exclusions,
      add_ons,
      tripHighlight,
      accommodation,
      room,
      faq,
      tags,
      location,
      destination,
      cost_price,
      slug,
      is_published,
      experience,
      card_img,
      currency,
      home_tag,
      suggested_sell_price_start,
      suggested_sell_price_end,
      new_faq,
      logo_color,
      cover_video,
      cover_img,
      cover_img_mob,
      cover_video_mob,
    });
    const savedTrip = await newTrip.save();
    res.status(200).json({
      status: "success",
      trip: savedTrip,
    });
  } catch (err) {
    next(err);
  }
}

export async function UpdateTrip(req, res, next) {
  try {
    const slug = req.body.slug;
    const fieldName = req.body.fieldName;
    if (fieldName) {
      const updates = req.body.updates;
      const bulkOperations = updates.map((update) => {
        const matchField = "_id";
        const { id, updateFields } = update;

        // Construct the filter for each update
        let filter = {
          slug: slug,
        };
        if (id) {
          filter = {
            slug: slug,
            [`${fieldName}.${matchField}`]: id,
          };
        }

        // Construct the update operation for each update
        let updateOperation = {
          $set: {},
        };

        // Add each field to update to the $set operator

        if (update.delete) {
          updateOperation = {
            $pull: {
              [fieldName]: { _id: id },
            },
          };
        } else if (id) {
          for (let field in updateFields) {
            updateOperation.$set[`${fieldName}.$.${field}`] =
              updateFields[field];
          }
        } else {
          updateOperation = {
            $push: {
              [fieldName]: updateFields,
            },
          };
        }
        // Return the update operation
        return {
          updateOne: {
            filter,
            update: updateOperation,
            upsert: true,
          },
        };
      });

      // Execute the bulk update operations
      const result = await Trip.bulkWrite(bulkOperations);
    } else {
      await Trip.findOneAndUpdate({ slug: slug }, req.body);
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
}

export async function GetPublishedTrips(req, res, next) {
  try {
    const trips = await Trip.find(
      { is_published: true },
      "title start_date end_date location images host tags card_img price slug home_tag"
    ).limit(10);

    for (let i = 0; i < trips.length; i++) {
      const user_id = trips[i].host;
      const user = await User.findOne({ _id: user_id });
      trips[i] = {
        ...trips[i]._doc,
        host_profile_pic: user.profile_pic,
        host_name: user.name,
      };
    }

    res.status(200).json({
      status: "success",
      trips: trips,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetUnpublishedTrips(req, res, next) {
  try {
    const trips = await Trip.find(
      { is_published: false },
      "title start_date end_date location tags card_img slug destination home_tag suggested_sell_price_start suggested_sell_price_end"
    ).limit(10);

    res.status(200).json({
      status: "success",
      trips: trips,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetTrip(req, res, next) {
  try {
    console.log(req.body)
    const slug = req.body.slug;
    const trip = await Trip.findOne({ slug: slug }).select('-cost_price');
    const user_id = trip?.host;
    const user = await User.findOne({ _id: user_id });

    res.status(200).json({
      status: "success",
      trip: trip,
      host_info: {
        name: user?.name,
        profile_pic: user?.profile_pic,
        bio: user?.bio,
        social_media_link: user?.social_media_link
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function GetCreatorTrip(req, res, next) {
  try {
    const user = req.user;
    const trips = await Trip.find({ host: user._id });
    res.status(200).json({
      status: "success",
      trip: trips?.[0],
      creator_bio: user.bio,
    });
  } catch (err) {
    next(err);
  }
}

export async function UpdateCreatorTrip(req, res, next) {
  try {
    const { currency, earlyBirdPrice, host_bio, price, title, trip_slug } =
      req.body;
    const trip = await Trip.findOne({ slug: trip_slug });
    const user = await User.findOne({ email: req.user.email });
    if (trip.host != user._id) {
      res.status(400).json({
        status: "error",
        message: "You are not the owner of this trip",
      });
    }
    trip.currency = currency;
    trip.early_bird_price = earlyBirdPrice;
    trip.price = price;
    trip.title = title;
    trip.save();

    user.bio = host_bio;
    await user.save();

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
}

export async function CreateBooking(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      gender,
      country,
      amount_paid,
      booking_status,
      trip_slug,
      currency,
    } = req.body;

    const booking = new Bookings({
      name,
      email,
      phone,
      gender,
      country,
      amount_paid,
      booking_status,
      currency,
      trip_slug,
    });

    const savedBooking = await booking.save();
    res.status(200).json({
      status: "success",
      booking: savedBooking,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetBookings(req, res, next) {
  try {
    const user = req.user;

    const { trip_slug } = req.body;
    const trip = await Trip.findOne({ slug: trip_slug });
    if (trip.host != user._id) {
      res.status(200).json({
        status: "error",
        message: "You are not the owner of this trip",
      });
    } else {
      const bookings = await Bookings.find({ trip_slug });
      res.status(200).json({
        status: "success",
        bookings: bookings,
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function GetAllCreators(req, res, next) {
  try {
    const creators = await User.find({ role: "Creator" });
    res.status(200).json({
      creators,
    });
  } catch (err) {
    next(err);
  }
}

export async function AddCreatorToTrip(req, res, next) {
  try {
    const { creator_id, trip_slug } = req.body;
    const trip = await Trip.findOne({ slug: trip_slug });
    trip.host = creator_id;
    await trip.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
}

export async function TestJuspay(req, res, next) {}
