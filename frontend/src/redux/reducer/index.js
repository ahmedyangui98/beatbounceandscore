import { combineReducers } from "redux";
import Authreducer from "./Authreducer";
import errorreducer from "./errorreducer";
import coursesreducer from "./coursesreducer";
import chaptersreducer from "./chaptersreducer";
const rootReducer = combineReducers({
  Authreducer,
  errorreducer,coursesreducer,chaptersreducer,
});
export default rootReducer;
