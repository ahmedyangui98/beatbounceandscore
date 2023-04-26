import { combineReducers } from "redux";
import Authreducer from "./Authreducer";
import errorreducer from "./errorreducer";
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';

import authReducer from '../../features/auth/authSlice'
import facenetReducer from '../../features/auth/facenetSlice'
import userReducer from '../../features/dashboard/userSlice'
import detectReducer from '../../features/dashboard/detectSlice'
import coursesreducer from "./coursesreducer";
import chaptersreducer from "./chaptersreducer";
<<<<<<< HEAD
import userreducer from "./reducer"
=======
import { offerListReducer,offerDetailsReducer,offerDeleteReducer,offerCreateReducer,offerUpdateReducer,offerReviewCreateReducer  } from "./offerReducers";

>>>>>>> e9c0ccc27343459ecc9079dc5a437f3ee7b9614b
const rootReducer = combineReducers({
  coursesreducer
  ,chaptersreducer,userreducer,
  Authreducer,
  errorreducer,
  questions : questionReducer,
  result : resultReducer,
  
  auth: authReducer,
  facenet: facenetReducer,
  user: userReducer,
  detect: detectReducer,

  offerslist: offerListReducer,
  offerDetails:offerDetailsReducer,
  offreDelete: offerDeleteReducer,
  offreCreate: offerCreateReducer,
  offerUpdate:offerUpdateReducer,
  offerReviewCreate:offerReviewCreateReducer 
});
export default rootReducer;
