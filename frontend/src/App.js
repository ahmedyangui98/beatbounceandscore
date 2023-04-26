import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import AdminNaviguation from "./Admin/AdminNaviguation";
import PrivateRoutes from "./PrivateRoutes";
import { get_current } from "./redux/Action/authAction";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import ForgotPassword from "./ForgotPassword";
import AdminProfile from "./Admin/AdminProfile"
import DefaultNavigation from "./DefaultNavigation";
import { useSelector } from "react-redux";
import UserNaviguation from "./User/UserNaviguation";
import Main from "./User/Main";
import Result from "./User/Result";
import ResultScoreBoard from "./User/ResultScoreBoard";



import CoachNavigation from "./Coach/CoachNavigation";
import ParentNaviguation from "./Parent/ParentNaviguation";
import ProfileU from "./ProfileU"
import UserManagement from "./Admin/UserManagment";
import UserGenderChart from "./Admin/UserGenderChart";
import UserRolesChart from "./Admin/UserRolesChart";

import Quiz from "./User/Quiz";
import ResultTable from "./User/ResultTable";

import Auth from "./Admin/FaceRecognition/Auth";
import { Loader } from "./Admin/FaceRecognition/Loader";
import ResultDetails from "./User/ResultDetails";
import QuizAdmin from "./Admin/QuizAdmin";
import 'react-notifications/lib/notifications.css';
import QuizResults from "./Admin/QuizResults";
import QuizManagment from "./Admin/QuizManagment";
import Chapters from "./Courses/Chapters";
import UserCourses from "./Courses/UserCourses";
import AdminCourses from "./Courses/AdminCourses";
import AddCourses from "./Courses/AddCourses";
import AddChapter from "./Courses/AddChapter";
import ChaptersAdmin from "./Courses/ChaptersAdmin";

import Room from "./videoroom/Room"
import Join from "./videoroom/Join";

import HomeScreen from "./screens/HomeScreen";
import OfferDetailsScreen from "./screens/OfferDetailsScreen";
import OfferListScreen from "./screens/OfferListScreen"
import OfferEditScreen from "./screens/OfferEditScreen";
import QuizPaymentPage from "./User/QuizPaymentPage";
import QuizPay from "./User/QuizPay";
import Financialaid from "./User/Financialaid"




function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_current());
  }/*, []*/);
  const user = useSelector((state) => state.Authreducer.user);
  const token = localStorage.getItem("token")
  // console.log(localStorage)

  const role = user.role
  const actif = user.isActivated

  let nav;
  let profile;
  let quiz;
  let main;
  let result;
  let resultscoreboard;
  let results;
  let resultdetail;
  let homescreen;
  let offerdetails;
  let quizpaymentpage;
  let quizpay;
  let financialaid;






  switch (role) {
    case 'user':
      if (actif && token) { nav = <UserNaviguation />; }
      else { nav = <DefaultNavigation /> }
      profile = <ProfileU />
      main = <Main />
      quiz = <Quiz />
      resultscoreboard = <ResultScoreBoard />
      result = <Result />
      results = <ResultTable />
      resultdetail = <ResultDetails />
      homescreen = <HomeScreen />
      offerdetails = <OfferDetailsScreen />
      quizpaymentpage=<QuizPaymentPage/>
      quizpay=<QuizPay/>
      financialaid=<Financialaid/>



      break;
    case 'admin':
      if (actif && token) { nav = <AdminNaviguation />; }
      else { nav = <DefaultNavigation /> }
      profile = <AdminProfile />

      break;
    case 'coach':
      if (actif && token) { nav = <CoachNavigation />; }
      else { nav = <DefaultNavigation /> }
      profile = <ProfileU />


      break;
    case 'parent':
      if (actif && token) { nav = <ParentNaviguation />; }
      else { nav = <DefaultNavigation /> }
      profile = <ProfileU />
      break;

    default:
      nav = <DefaultNavigation />;
      profile = <Home />

      break;
  }


  return (
    <>
    <Loader/>
    <div className="App">
      <>{nav}</>
    <div className="limiter">

      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />        <Route path="/register" element={<Register />} /> 
       <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />

              <Route path="/admin" element={<Auth/>} />


        {/* <Route path="/profile" element={<UserProfile />} /> */}
        {/* User routes */}
        <Route
          path="/quiz"
          element={<PrivateRoutes Children={main} />}
        />
        <Route
          path="/quiz/:type"
          element={<PrivateRoutes Children={quiz} />}
        />

        <Route
          path="/score"
          element={<PrivateRoutes Children={resultscoreboard} />}
        />
        <Route
          path="/result"
          element={<PrivateRoutes Children={result} />}
        />
        <Route
          path="/results"
          element={<PrivateRoutes Children={results} />}
        />
        <Route
          path="/resultdetail/:type/:id"
          element={<PrivateRoutes Children={resultdetail} />}
        />

<Route
          path="/addcourse"
          element={<PrivateRoutes Children={<AddCourses />} />}
        />
        <Route
          path="/addchapter"
          element={<PrivateRoutes Children={<AddChapter/>} />}
        />
         <Route
          path="/chapters/:id"
          element={<PrivateRoutes Children={<Chapters/>} />}
        />
          <Route
          path="/join"
          element={<Join/>}
        /> <Route
        path="/room"
        element={<PrivateRoutes Children={<Room  u={user}/>} />}
      />
        <Route
          path="/chaptersadmin/:id"
          element={<PrivateRoutes Children={<ChaptersAdmin/>} />}
        />
         <Route
          path="/usercourses"
          element={<PrivateRoutes Children={<UserCourses />} />}
        />
        <Route
          path="/admincourses"
          element={<PrivateRoutes Children={<AdminCourses />} />}
        />

         <Route
          path="/profile"
          element={<PrivateRoutes Children={profile} />}
        />
         <Route
          path="/users"
          element={<PrivateRoutes Children={<UserManagement />} />}
        />
        <Route
          path="/users"
          element={<PrivateRoutes Children={<UserManagement />} />}
        />
        <Route
          path="/quizManagment"
          element={<PrivateRoutes Children={<QuizManagment />} />}
        />
        <Route
          path="/quizAdmin"
          element={<PrivateRoutes Children={<QuizAdmin />} />}
        />
        <Route
          path="/quizResults"
          element={<PrivateRoutes Children={<QuizResults />} />}
        />
        <Route
          path="/resultdetails/:type/:id"
          element={<PrivateRoutes Children={<ResultDetails/>} />}
        />
        
        <Route path="/countGender" 
        element={<UserGenderChart/>}
        />
        <Route
          path="/count"
          element={<UserRolesChart  />} />

     
          </Routes>

        </div>
      </div>

    </>
  );
}

export default App;
