const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  createCategoryController,
  getAllCategoryControllers,
  updateCategoryControllers,
  deleteCategoryControllers,
} = require("../controllers/categoryController");
const router = express.Router();

//routes

// Create Category routes
router.post("/createCat", authmiddleware, createCategoryController);

//get all category routes
router.get("/getAllCat", getAllCategoryControllers);

// update categories
router.put("/updateCat/:id", authmiddleware, updateCategoryControllers);

// Delete Categories routes
router.delete("/deleteCat/:id", authmiddleware, deleteCategoryControllers);

module.exports = router;
