const mongoose = require("mongoose");
require("./User");

const schema = new mongoose.Schema({
  
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
},

  img: {
    type: String,
    required: true,
  }
  
  
 
});

const model = mongoose.models.UserImage || mongoose.model("UserImage", schema);

module.exports = model;
