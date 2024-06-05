const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

// routes

// Get user
router.get("/getUser", authmiddleware, getUserController);

//Update profile
router.put("/updateUser", authmiddleware, updateUserController);

// Update password
router.post("/updatePassword", authmiddleware, updatePasswordController);

// Reset password
router.post("/resetPassword", authmiddleware, resetPasswordController);

// DElete user

router.delete("/deleteUser/:id", authmiddleware, deleteUserController);
module.exports = router;
