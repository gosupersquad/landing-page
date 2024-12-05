import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../config/index.js";

const OTPSchema = new mongoose.Schema({
  otp: { type: String, required: false },
  otpExpiresAt: { type: Date, required: false },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Your firstname is required",
      max: 55,
    },
    phone: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: false,
    },
    social_media_link: {
      type: String,
      required: "Your social media link is required",
      unique: true,
      lowercase: true,
    },
    social_media_follower: {
      type: String,
    },
    main_social_channel: {
      type: String,
      required: "Your social channel link is required",
      enum: ["Instagram", "YouTube", "Facebook", "Twitter"],
    },
    password: {
      type: String,
      select: false,
      max: 25,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Creator", "User"],
    },
    profile_pic: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    otp: {
      type: OTPSchema,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: "365d",
  });
};

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export default mongoose.model("users", UserSchema);
