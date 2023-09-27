import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  // upadate the global auth context so that user gets logged in even when refreshed
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log("AuthContext state", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
// With this setup, you can use the AuthContext and its associated dispatch function in your components to handle user authentication and manage the user state. For example, you can dispatch the "LOGIN" action to set the user object when a user successfully logs in and dispatch the "LOGOUT" action to clear the user object when they log out.
