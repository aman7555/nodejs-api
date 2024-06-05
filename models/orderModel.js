const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
