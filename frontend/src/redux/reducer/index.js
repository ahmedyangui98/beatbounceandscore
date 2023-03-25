import { combineReducers } from "redux";
import Authreducer from "./Authreducer";
import errorreducer from "./errorreducer";
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';

const rootReducer = combineReducers({
  Authreducer,
  errorreducer,
  questions : questionReducer,
  result : resultReducer,
});
export default rootReducer;
