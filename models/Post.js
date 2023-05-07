const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    imgs: { type: Array },
    author: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
