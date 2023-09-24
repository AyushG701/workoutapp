require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
// express app

const app = express();

// middleware
app.use(express.json()); // helps to use req command  if not used we wont be able to use

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workout", workoutRoutes);
// routes
app.get("/", (req, res) => {
  res.json({ mssg: "welcome to the appd" });
});
// connect to the db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(" connected to db $ listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
//listen for requests
