const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  createRestaurentController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");
const router = express.Router();

//routes

//create restaurant routes
router.post("/create", authmiddleware, createRestaurentController);

// get all restaurant routes
router.get("/getAllRes", getAllRestaurantController);

//get restaurant by id routes
router.get("/getRestaurantById/:id", getRestaurantByIdController);

// DELETE restaurant routes
router.delete(
  "/deleteRestaurantById/:id",
  authmiddleware,
  deleteRestaurantController
);
module.exports = router;
