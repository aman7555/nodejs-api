const colors = require("colors");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.error("DB Error", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDb;
