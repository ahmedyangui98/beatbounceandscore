import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Alerterrors from "./Alerterrors";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Navigation from "./Navigation";
import PrivateRoutes from "./PrivateRoutes";
import { get_current } from "./redux/Action/authAction";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Courses from "./Courses"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_current());
  }/*, []*/);
  return (
    <div className="App">
      <Navigation />
    
      <Alerterrors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route
          path="/profile"
          element={<PrivateRoutes Children={<UserProfile />} />}
        />
         <Route
          path="/courses"
          element={<PrivateRoutes Children={<Courses />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
