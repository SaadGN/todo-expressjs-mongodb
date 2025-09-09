const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const validator = require("validator")
require('dotenv').config();

const secret = process.env.SECRET

// Signup
async function signup(req, res) {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const hashedPwd = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const user = new User({
      username,
      email,
      password: hashedPwd,
      otp,
      otpExpires,
      status: false
    });
    await user.save();

    // send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: user.email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}`
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to send OTP email" });
    }


    return res.json({ message: "OTP sent to email. Please verify." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    
    if (!user.status) {
      return res.status(403).json({ error: "Account not verified. Please verify OTP first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });


    const token = jwt.sign({
      id: user._id,
      email: user.email,
    }, secret,
      {
        expiresIn: "1h"
      });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// verifying OTP
async function verifyOtp(req, res) {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid user" });
    }

    if (user.status) {
      return res.status(400).json({ error: "User already verified" })
    }
    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (user.otpExpires.getTime() < Date.now()) {
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(400).json({ error: "OTP expired. Please request a new one." });
    }



    user.status = true;
    user.otp = null;
    user.otpExpires = null
    await user.save();

    res.json({ message: "User verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function resendOtp(req, res) {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "user not found" })
    }
    if (user.status) {
      return res.status(400).json({ error: "user already verified" })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.USER_MAIL,
        to: user.email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}`
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to send OTP email" });
    }


    return res.json({ message: "OTP re-sent to email. Please verify." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { signup, login, verifyOtp, resendOtp };