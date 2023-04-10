import {
  GET_CURRENT,
  GET_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,FIND_USER,UPDATE_USERS,DELETE_USERS,UPDATE, RESET_PASSWORD,FORGOT_PASSWORD,CHANGE_PASSWORD,GET_RESULT
} from "../Types/authTypes";

const initialState = {
  users: [],
  user: {},
  errors: [],
  fu:[],
  result: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.users };
    case LOGIN:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.users };
    case GET_CURRENT:
      return { ...state, user: payload.user };
      case DELETE_USERS:
        return { loading: true };
    case GET_USERS:
      return { ...state, users: payload.userss };
      case FIND_USER:
        return { ...state, fu: payload.fu };
        case UPDATE_USERS:
          return { loading: true };
          case UPDATE:
            return { loading: true };
  
    case RESET_PASSWORD:
    return { loading: true  };  
    case FORGOT_PASSWORD:
    return { loading: true  };  
    case CHANGE_PASSWORD:
    return { loading: true  };  

    case GET_RESULT:
    return { ...state, result: payload };    

    case LOGOUT:
      localStorage.removeItem("token");

      return { ...state, user: null };
    default:
      return state;
  }
};
export default reducer;