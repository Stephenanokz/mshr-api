const mongoose = require("mongoose");

const ApostolateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apostolate", ApostolateSchema);
