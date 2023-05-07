const mongoose = require("mongoose");

const GalleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryImage", GalleryImageSchema);
