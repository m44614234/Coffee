const mongoose = require("mongoose");
require("./CommentBlog");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  body : {
    type: String,
    required: true,
  },
  img: {
    type: String, // img src
    required: true,
  },
  tags :{
    type : [String]
  },
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "CommentBlog",
      },
    ],
  },
  
},
{
    timestamps: true ,
}
);

const model = mongoose.models.Blog || mongoose.model("Blog", schema);

export default model;
