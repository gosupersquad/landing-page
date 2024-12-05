import express from "express";
import {
  getAllTrips,
  getTripById,
  getTripCheckoutData,
} from "../controllers/tripv2.js";

const router = express.Router();

// GET routes
// router.get("/", getAllTrips);
router.post("/", getTripById);
router.post("/checkout", getTripCheckoutData);

export default router;
