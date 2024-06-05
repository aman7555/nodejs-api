const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default: "https://example.com/images/logo.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
