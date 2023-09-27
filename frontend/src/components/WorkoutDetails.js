import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
// date_fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workout/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log("Workout Deleted");
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load: </strong>
        {workout.load}{" "}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      {/* <p>{workout.createdAt}</p> */}
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      <span></span>
    </div>
  );
};

export default WorkoutDetails;
