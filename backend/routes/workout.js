const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  removeWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
// router.get("/:id", (req, res) => {
//   res.json({ mssg: "get a single workouts" });
// });
router.get("/:id", getWorkout);

// Post a new workout
router.post("/", createWorkout);
//   res.json({ mssg: " POST create a single workouts" });

// delete a workout
router.delete("/:id", removeWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
