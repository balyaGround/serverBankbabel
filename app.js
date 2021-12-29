require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// Config environment
const express = require("express"); // Import express
const cors = require("cors");
const app = express(); // Make express app

// CORS
app.use(cors());

//Import routes
const parameter = require("./routes/parameter");

// Import errorHandler
const errorHandler = require("./middlewares/errorHandler");

// Enable req.body
app.use(express.json()); // Enable req.body JSON
// Enable url-encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Use routes
app.get("/", async (req, res, next) => {
  try {
    res.json({ message: "hello" });
  } catch (error) {
    next(error);
  }
});

// / The routes
app.use("/api/parameter", parameter);

// If routes not found
app.all("*", (req, res, next) => {
  try {
    next({ message: "Endpoint not Found", statusCode: 404 });
  } catch (error) {
    next(error);
  }
});

// User errorHandler
app.use(errorHandler);

//Running server

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log("Server running on port ${PORT}"));
}

module.exports = app;
