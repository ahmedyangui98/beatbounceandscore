import { combineReducers } from "redux";
import Authreducer from "./Authreducer";
import errorreducer from "./errorreducer";

const rootReducer = combineReducers({
  Authreducer,
  errorreducer,
});
export default rootReducer;
