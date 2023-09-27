import React, { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  //fetching the data from the backend

  useEffect(() => {
    console.log("this is start");
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workout", {
          // make the auth0r9zed requests
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
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
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

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
