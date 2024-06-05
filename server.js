const express = require("express");
const colors = require("colors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//port
const PORT = process.env.PORT || 8080;

// dotenv configuration
dotenv.config();

// // DB Connection
connectDb();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", require("./routes/testroutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoute"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1> welcome</h1>");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.white.bgMagenta);
});
