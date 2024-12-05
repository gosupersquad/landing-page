import User from "../models/User.js";
import bcrypt from "bcrypt";
import Blacklist from "../models/Blacklist.js";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config/index.js";
import moment from "moment";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

/**
 * @route POST v1/auth/register
 * @desc Registers a user
 * @access Public
 */
export async function Register(req, res, next) {
  // get required variables from request body
  // using es6 object destructing
  const {
    name,
    email,
    password,
    phone,
    main_social_channel,
    social_media_link,
    role,
    bio,
  } = req.body;
  try {
    // create an instance of a user
    const newUser = new User({
      name,
      phone,
      social_media_link,
      main_social_channel,
      email,
      password,
      role,
      bio,
    });
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    const existingUser1 = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        type: "Email",
        message:
          "It seems you already have an account with this email, please log in instead.",
      });
    if (existingUser1)
      return res.status(400).json({
        status: "failed",
        data: [],
        type: "Phone",
        message:
          "It seems you already have an account with this phone, please log in instead.",
      });
    const savedUser = await newUser.save(); // save new user into the database
    let options = {
      maxAge: 20 * 60 * 1000, // would expire in 20minutes
      httpOnly: true, // The cookie is only accessible by the web server
      secure: true,
      sameSite: "None",
    };
    const token = savedUser.generateAccessJWT(); // generate session token for user

    res.status(200).json({
      status: "success",
      message:
        "Thank you for registering with us. Your account has been successfully created.",
      token: token,
    });
  } catch (err) {
    next(err);
  }
  res.end();
}

/**
 * @route POST v1/auth/login
 * @desc logs in a user
 * @access Public
 */
export async function Login(req, res, next) {
  // Get variables for the login process
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({
        status: "failed",
        data: [],
        message: "Account does not exist",
      });
    // if user exists
    // validate password
    const isPasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );

    // if not valid, return unathorized response
    if (!isPasswordValid)
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });

    let options = {
      maxAge: 2000 * 60 * 1000, // would expire in 20minutes
      httpOnly: true, // The cookie is only accessible by the web server
      secure: true,
      sameSite: "None",
    };
    const token = user.generateAccessJWT();
    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      token: token,
    });
  } catch (err) {
    next(err);
  }
  res.end();
}

export async function UpdateProfilePic(req, res, next) {
  try {
    await User.findOneAndUpdate({ email: req.user.email }, req.body);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @route POST /auth/logout
 * @desc Logout user
 * @access Public
 */
export async function Logout(req, res, next) {
  try {
    const accessToken = req.body.token;
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader("Clear-Site-Data", '"cookies"');
    res.status(200).json({ status: "success", message: "You are logged out!" });
  } catch (err) {
    next(err);
  }
  res.end();
}

export async function SendOtp(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(200).json({
        status: "error",
        message: "User with this email does not exist",
      });
    } else {
      const otp = Math.floor(Math.random() * 1000000);
      const text =
        "Use this OTP - " + otp + " for setting your supersquad password";
      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "OTP for resetting supersquad password",
        text: text,
      };
      user.otp = {
        otp: otp.toString(),
        otpExpiresAt: moment().add(5, "minutes").toDate(),
      };
      await user.save();
      res.status(200).json({
        status: "success",
      });

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "Internal Server Error",
          });
        } else {
          res.status(200).json({
            status: "success",
          });
        }
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function VerifyOtp(req, res, next) {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(200).json({
        status: "error",
        message: "User with this email does not exist",
      });
    } else {
      if (otp == user.otp?.otp && !moment().isAfter(user.otpExpiresAt)) {
        user.otp = null;
        await user.save();
        res.status(200).json({
          status: "success",
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Incorrect OTP. Please try again",
        });
      }
    }
  } catch (err) {
    next(err);
  }
}

export async function UpdatePassword(req, res, next) {
  try {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(200).json({
        status: "error",
        message: "User with this email does not exist",
      });
    } else {
      user.password = newPassword;
      user.otp = null;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    }
  } catch (err) {
    next(err);
  }
}

export async function UserInfo(req, res, next) {
  try {
    const user = req.user;
    res.status(200).json({
      status: "success",
      user: {
        name: user.name,
        profile_pic: user.profile_pic,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function UpdateUser(req, res, next) {
  try {
    const requestedUser = req.user;
    if (requestedUser.role == "Admin") {
      const user_email = req.body.user_email;
      await User.findOneAndUpdate({ email: user_email }, req.body);
      res.status(200).json({
        status: "success",
      });
    } else {
      await User.findOneAndUpdate({ email: req.user.email }, req.body);
      res.status(200).json({
        status: "success",
      });
    }
  } catch (err) {
    next(err);
  }
}
