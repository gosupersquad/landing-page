import express from "express";
import {
  CreateTrip,
  GetTrip,
  GetPublishedTrips,
  GetUnpublishedTrips,
  GetCreatorTrip,
  UpdateCreatorTrip,
  CreateBooking,
  GetBookings,
  GetAllCreators,
  AddCreatorToTrip,
  UpdateTrip,
} from "../controllers/trip.js";
import Validate from "../middleware/validate.js";
import {
  Verify,
  VerifyAdminRole,
  VerifyCreatorRole,
} from "../middleware/verify.js";

const router = express.Router();

router.post("/create_trip", Validate, Verify, VerifyAdminRole, CreateTrip);
router.get("/get_published_trips", Validate, GetPublishedTrips);
router.get(
  "/get_unpublished_trips",
  Validate,
  Verify,
  VerifyCreatorRole,
  GetUnpublishedTrips
);
router.post("/get_trip", Validate, GetTrip);
router.post("/update_trip", Validate, Verify, VerifyAdminRole, UpdateTrip);

router.get(
  "/get_creator_trip",
  Validate,
  Verify,
  VerifyCreatorRole,
  GetCreatorTrip
);
router.post(
  "/update_trip_by_creator",
  Validate,
  Verify,
  VerifyCreatorRole,
  UpdateCreatorTrip
);
router.post("/create_booking", Validate, CreateBooking);
router.post("/get_bookings", Validate, Verify, VerifyCreatorRole, GetBookings);
router.get(
  "/get_all_creators",
  Validate,
  Verify,
  VerifyAdminRole,
  GetAllCreators
);
router.post(
  "/add_creator_to_trip",
  Validate,
  Verify,
  VerifyAdminRole,
  AddCreatorToTrip
);

export default router;
