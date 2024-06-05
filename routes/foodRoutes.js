const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createFoodControllers } = require("../controllers/foodControllers");

const router = express.Router();
// Create Food routes
router.post("/createFood", authmiddleware, createFoodControllers);
module.exports = router;
