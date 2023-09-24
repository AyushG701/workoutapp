import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// date_fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const response = await fetch("/api/workout/" + workout._id, {
      method: "DELETE",
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
        <strong>Duration: </strong>
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
