import { combineReducers } from "redux";
import Authreducer from "./Authreducer";
import errorreducer from "./errorreducer";
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';

import authReducer from '../../features/auth/authSlice'
import facenetReducer from '../../features/auth/facenetSlice'
import userReducer from '../../features/dashboard/userSlice'
import detectReducer from '../../features/dashboard/detectSlice'

const rootReducer = combineReducers({
  Authreducer,
  errorreducer,
  questions : questionReducer,
  result : resultReducer,
  
  auth: authReducer,
  facenet: facenetReducer,
  user: userReducer,
  detect: detectReducer,
});
export default rootReducer;
