const mongoose = require("mongoose");

const CarouselImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarouselImage", CarouselImageSchema);
