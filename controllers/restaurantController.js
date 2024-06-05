const restaurantModel = require("../models/restaurantModel");
const bcrypt = require("bcryptjs");

// CREATE Restaurant controller
const createRestaurentController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // validations
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // create new restaurant
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    // save the new restaurant
    await newRestaurant.save();
    res.status(200).send({
      success: true,
      message: "Your Restaurant created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create restaurant API",
      error,
    });
  }
};

// GET ALL restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      res.status(200).send({
        success: true,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all restaurant API",
      error,
    });
  }
};

// get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "restaurant is not found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getRestaurantByIdController API",
      error,
    });
  }
};

// DElete restaurant controller

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant Id",
      });
    }

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "restaurantId is not found",
      });
    }

    await restaurantModel.findByIdAndDelete(restaurantId);

    res.status(200).send({
      success: true,
      message: "Restaurant deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete Restaurant API",
      error,
    });
  }
};
module.exports = {
  createRestaurentController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
