import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  //fetching the data from the backend

  useEffect(() => {
    console.log("this is start");
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workout");
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const json = await response.json();
        // setWorkouts(json);
        dispatch({ type: "SET_WORKOUT", payload: json });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
