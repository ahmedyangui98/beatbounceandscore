import { combineReducers } from "redux";
import Authreducer from "./Authreducer";
import errorreducer from "./errorreducer";
import coursesreducer from "./coursesreducer";
const rootReducer = combineReducers({
  Authreducer,
  errorreducer,coursesreducer,
});
export default rootReducer;
