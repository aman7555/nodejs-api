const foodModel = require("../models/foodModel");

// create food controllers
const createFoodControllers = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || restaurant) {
      res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item is created",
    });
  } catch (error) {
    cosole.log(error);
    res.status(500).send({
      success: true,
      message: "error in create foood controllers",
    });
  }
};

module.exports = { createFoodControllers };
