const cors = require("cors");

require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const workoutRoute = require("./routes/workouts");

// express app
const app = express();

// enforcing cors policies
app.use(cors());

// allows req to be sent from frontend
app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
