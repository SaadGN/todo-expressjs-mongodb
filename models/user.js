const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
    type: Date, 
    default: null,
  }
});


const User = mongoose.model("User", userSchema)
module.exports = User;
