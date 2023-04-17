import {
  GET_CURRENT,
  GET_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,FIND_USER,UPDATE_USERS,DELETE_USERS,UPDATE, RESET_PASSWORD,FORGOT_PASSWORD,CHANGE_PASSWORD,GET_RESULT,DELETE_RESULT,ADD_QUIZ, GET_QUIZ, CHANGE_PASSWORD_SUCCESS
} from "../Types/authTypes";

const initialState = {
  users: [],
  user: {},
  errors: [],
  fu:[],
  result: [],
  quiz:{}
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
    case CHANGE_PASSWORD_SUCCESS: 
    return { ...state, user: payload };

    case GET_RESULT:
    return { ...state, result: payload }; 
    case GET_QUIZ:
    return { ...state, quiz: payload }; 
    
    case DELETE_RESULT:
      return { loading: true };

    case ADD_QUIZ:
    return { loading: true };
      
    case LOGOUT:
      localStorage.removeItem("token");

      return { ...state, user: null };
    default:
      return state;
  }
};
export default reducer;