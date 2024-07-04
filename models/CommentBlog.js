const mongoose = require("mongoose");
require("./User");
require("./Blog");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
    body: {
      type: String,
      require : true
    },
    email: {
      type: String,
      require : true
    },
    userName: {
      type: String,
      require : true
    },
   
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.CommentBlog || mongoose.model("CommentBlog", schema);

export default model;
