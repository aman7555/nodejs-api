const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  placeOrderController,
  changeOrderStatusController,
} = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// place order
router.post("/placeOrder", authmiddleware, placeOrderController);

// order status
router.post(
  "/changeOrderStatus/:id",
  authmiddleware,
  adminMiddleware,
  changeOrderStatusController
);
module.exports = router;
