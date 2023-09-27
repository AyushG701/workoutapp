import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutContext();
  const logout = () => {
    // remove the user from the storage
    localStorage.removeItem("user");
    //dispatch the logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};

// import { useAuthContext } from "./useAuthContext";

// export const useLogout = () => {
//   const { dispatch } = useAuthContext();

//   const logout = () => {
//     // remove user from storage
//     localStorage.removeItem("user");

//     // dispatch logout action
//     dispatch({ type: "LOGOUT" });
//   };

//   return { logout };
// };
