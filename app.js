require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment
const express = require("express"); // Import express
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express(); // Make express app

// CORS
app.use(cors());

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

/* Import routes */
const auth = require("./routes/auth");

const parameter = require("./routes/admin/parameter");

/* Import response */
const response = require("./middlewares/response");

/* Enable req.body */
app.use(express.json()); // Enable req.body JSON
// Enable url-encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* Make public folder as static */
app.use(express.static("public"));

/* Use routes */
app.get("/", async (req, res, next) => {
  try {
    res.redirect("https://documenter.getpostman.com/view/14563768/TzzGFt9w");
  } catch (error) {
    next(error);
  }
});

/* The routes */
const version = "/api/v1";
const adminV1 = "/api/v1/admin";

app.use(`${version}/auth`, auth);

// ======= admin routes =======
app.use(`${adminV1}/parameter`, parameter);

/* If routes not
found */
app.all("*", (req, res, next) => {
  try {
    next({
      message: "Endpoint not Found",
      error: "Not Found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
});

/* User response */
app.use(response);

/* Running server */
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
