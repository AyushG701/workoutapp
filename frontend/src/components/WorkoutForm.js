import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState("");
  const { user } = useAuthContext();
  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be logged in ");
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields("");
      console.log("new workout added ", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form action="" className="create" onSubmit={handleSumbit}>
      <h3>Add a New Workout</h3>
      <label>Excersize Title</label>
      <input
        type="text"
        name=""
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load</label>
      <input
        type="number"
        name=""
        value={load}
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Excersize Title</label>
      <input
        type="number"
        name=""
        value={reps}
        onChange={(e) => {
          setReps(e.target.value);
        }}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
