import express from "express";
import {
  Register,
  Login,
  Logout,
  SendOtp,
  UpdatePassword,
  UpdateProfilePic,
  VerifyOtp,
  UserInfo,
  UpdateUser,
} from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import {
  Verify,
  VerifyAdminRole,
  VerifyCreatorRole,
} from "../middleware/verify.js";

const router = express.Router();

// Register route -- POST request
router.post("/register", Validate, Register);

// Login route == POST request
router.post("/login", Validate, Login);

router.post("/logout", Logout);

router.post("/send_otp", SendOtp);

router.post("/reset_password", UpdatePassword);

router.get("/get_user_info", Verify, VerifyCreatorRole, UserInfo);

router.post("/update_profile_pic", Verify, UpdateProfilePic);
router.post("/update_user", Verify, VerifyAdminRole, UpdateUser);

router.post("/verify_otp", VerifyOtp);

export default router;
