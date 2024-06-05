const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  createFoodControllers,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResController,
  updateFoodControllers,
  foodDeleteController,
} = require("../controllers/foodControllers");

const router = express.Router();
// Create Food routes
router.post("/createFood", authmiddleware, createFoodControllers);

// get all foods routes
router.get("/getAllFood", getAllFoodsController);

// get single food by id
router.get("/getSingleFoodById/:id", getSingleFoodController);

// get food by restaurant
router.get("/getFoodByRes/:id", getFoodByResController);

// update food
router.put("/updateFood/:id", authmiddleware, updateFoodControllers);

// delete food
router.delete("/deleteFood/:id", authmiddleware, foodDeleteController);
module.exports = router;
