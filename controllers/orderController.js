const orderModel = require("../models/orderModel");

//place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please add food cart or payment method",
      });
    }
    let total = 0;
    // calculation
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    res.status(200).send({
      success: true,
      message: "order placed",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in place order api",
      error,
    });
  }
};

// change order status
const changeOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "please provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in change order status api",
      error,
    });
  }
};
module.exports = { placeOrderController, changeOrderStatusController };
