const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  default : "کاربر سایت"
  },
  email: {
    type: String,
    required: false,
  },
  img: {
    type: String, // img src
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER",
  },

  //   refreshToken: {
  //     type: String,
  //   },

  refreshToken: String,
});

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
