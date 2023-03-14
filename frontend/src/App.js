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
import ProfileU from "./ProfileU"
import UserManagement from "./Admin/UserManagment";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_current());
  }/*, []*/);
  const user = useSelector((state) => state.Authreducer.user);
  const token=localStorage.getItem("token")

  const role=user.role
  const actif=user.isActivated

  let nav;
  let profile;
  switch (role) {
    case 'user':
      if(actif&&token){nav = <UserNaviguation/>;}
      else {nav=<DefaultNavigation/>}
      profile=<ProfileU/>
      break;
    case 'admin':
      if(actif&&token){nav = <AdminNaviguation/>;}
      else {nav=<DefaultNavigation/>}
      profile=<AdminProfile/>
      break;
      case 'coach':
        if(actif&&token){nav = <CoachNavigation/>;}
      else {nav=<DefaultNavigation/>}
        profile=<ProfileU/>
        break;
    case 'parent':
      if(actif&&token){nav = <ParentNaviguation/>;}
      else {nav=<DefaultNavigation/>}
      profile=<ProfileU/>
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
          path="/users"
          element={<PrivateRoutes Children={<UserManagement />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
