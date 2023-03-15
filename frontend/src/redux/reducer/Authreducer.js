import {
  GET_CURRENT,
  GET_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,FIND_USER,UPDATE_USERS,DELETE_USERS,UPDATE
} from "../Types/authTypes";

const initialState = {
  users: [],
  user: {},
  errors: [],
  fu:[]
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
  

    case LOGOUT:
      localStorage.removeItem("token");

      return { ...state, user: null };
    default:
      return state;
  }
};
export default reducer;