const mongoose = require("mongoose");
require("./Product");
require("./User");
require("./Orders");

const schema = new mongoose.Schema(
  {
    
    
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: [],
    finalPrice : {
      type: Number,
      required: true,
    } ,
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      require: true,
    },
    family: {
      type: String,
      required: true,
    },
  
    province: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
   
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const model =
  mongoose.models.CheckoutUser || mongoose.model("CheckoutUser", schema);

export default model;
