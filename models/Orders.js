const mongoose = require("mongoose");
require("./User");
require("./Product");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },

  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Orders || mongoose.model("Orders", schema);

export default model;
