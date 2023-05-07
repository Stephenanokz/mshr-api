const mongoose = require("mongoose");

const ApostolateTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String },
    apostolates: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApostolateType", ApostolateTypeSchema);
