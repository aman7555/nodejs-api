const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register Controller
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    if (!username || !email || !password || !phone || !address || !answer) {
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

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

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

// login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please enter all fields",
      });
    }

    // check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found ",
      });
    }

    // user is valid | compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid Credentials",
      });
    }

    //jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // paasword will not show on response
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "login SuccessFully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
