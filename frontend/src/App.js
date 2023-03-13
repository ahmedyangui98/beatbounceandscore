import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Alerterrors from "./Alerterrors";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import AdminNaviguation from "./Admin/AdminNaviguation";
import PrivateRoutes from "./PrivateRoutes";
import { get_current } from "./redux/Action/authAction";
import Register from "./Register";
import AdminProfile from "./Admin/AdminProfile"
import Courses from "./Courses"
import DefaultNavigation from "./DefaultNavigation";
import { useSelector } from "react-redux";
import UserNaviguation from "./User/UserNaviguation";
import CoachNavigation from "./Coach/CoachNavigation";
import ParentNaviguation from "./Parent/ParentNaviguation";
import UserProfile from "./User/UserProfile"
import CoachProfile from "./Coach/CoachProfile"
import ParentProfile from "./Parent/ParentProfile"
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_current());
  }/*, []*/);
  const user = useSelector((state) => state.Authreducer.user);
  const token=localStorage.getItem("token")
  console.log("token"+token)
  console.log("this user is"+user)
  const role=user.role
  const actif=user.isActivated
  console.log("actif"+actif)
  let nav;
  let profile;
  switch (role) {
    case 'user':
      if(actif&&token){nav = <UserNaviguation/>;}
      else {nav=<DefaultNavigation/>}
      profile=<UserProfile/>
      break;
    case 'admin':
      if(actif&&token){nav = <AdminNaviguation/>;}
      else {nav=<DefaultNavigation/>}
      profile=<AdminProfile/>
      break;
      case 'coach':
        if(actif&&token){nav = <CoachNavigation/>;}
      else {nav=<DefaultNavigation/>}
        profile=<CoachProfile/>
        break;
    case 'parent':
      if(actif&&token){nav = <ParentNaviguation/>;}
      else {nav=<DefaultNavigation/>}
      profile=<ParentProfile/>
      break;
      
    default:
      nav = <DefaultNavigation/>;
      profile=<Home/>
    
      break;
  }

  
  return (
    <div className="App">
      <>{nav}</>
      
    
      <Alerterrors />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
         <Route
          path="/profile"
          element={<PrivateRoutes Children={profile} />}
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
