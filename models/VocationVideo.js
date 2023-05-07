const mongoose = require("mongoose");

const VocationVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    video: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VocationVideo", VocationVideoSchema);
