import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./index.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import { WorkoutContextProvider } from "./context/WorkoutContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />} // the logic helps to protects the routes
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
