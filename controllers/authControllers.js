const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    console.log("Incoming request:", req.body);

    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !phone || !address) {
      console.log("Validation failed: missing fields");
      return res.status(400).send({
        success: false,
        message: "Please enter all fields",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      console.log("Email already registered:", email);
      return res.status(400).send({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const user = new userModel({
      username,
      email,
      password,
      phone,
      address,
    });

    await user.save();
    console.log("User created successfully:", user);

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error in Register API:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

module.exports = { registerController };
