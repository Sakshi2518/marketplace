const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profImage: {
    type: String,
  },
  dob: {
    type: Date,
  },
  university: {
    type: String,
  },
  gradYear: {
    type: Number,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  }
});

module.exports = mongoose.model("User", userSchema);
