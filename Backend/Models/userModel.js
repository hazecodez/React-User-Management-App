const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_Admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
    default: "",
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
