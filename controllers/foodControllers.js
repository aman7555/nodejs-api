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

    if (!title || !description || !price || !restaurant) {
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
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in create foood controllers",
    });
  }
};

// get all foods
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "Food item is not found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in get all foood controllers",
    });
  }
};

// get single food by id
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in get single foood controllers",
    });
  }
};

// get food by restaurant
const getFoodByResController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "restaurant id not found",
      });
    }

    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: " food not found with  this restaurant",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get foood by restaurant controllers",
    });
  }
};

// update food controller
const updateFoodControllers = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: true,
        message: "food is not found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "food not found",
      });
    }
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

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
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
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "food Updated successfully",
      updatedFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in  update food controller API",
    });
  }
};

// food delete

const foodDeleteController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "food id not found",
      });
    }
    const deletedFood = await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "food deleted successfully",
      deletedFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in  delete food controller API",
    });
  }
};
module.exports = {
  createFoodControllers,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResController,
  updateFoodControllers,
  foodDeleteController,
};
