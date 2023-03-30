import { GET_COURSES,ADD_COURSE,UPDATE_COURSES,DELETE_COURSES,FIND_COURSE } from "../Types/coursesTypes";
const initialState = {  users: [],
  

   courses:[],
    
    fc:[],
 

}
  


const coursesreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COURSES:
      return { ...state, courses: payload.coursess};
      case DELETE_COURSES:
        return { loading: true };
  
      case FIND_COURSE:
        return { ...state, fc: payload.fc };
        case UPDATE_COURSES:
          return { loading: true };
          case ADD_COURSE:return  { ...state, courses: payload.coursess };
          
    default:
      return state;
  }
};

export default coursesreducer;