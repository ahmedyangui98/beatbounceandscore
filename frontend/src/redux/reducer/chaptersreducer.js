import { GET_CHAPTERS,ADD_CHAPTER,UPDATE_CHAPTERS,FIND_CHAPTER,DELETE_CHAPTERS } from "../Types/chapterTypes";
const initialState = {  users: [],
  

  chapters:[],
    
    fch:[],
 

}
  


const chaptersreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAPTERS:
      return { ...state, chapters: payload.chapterss};
      case DELETE_CHAPTERS:
        return { loading: true };
  
      case FIND_CHAPTER:
        return { ...state, fch: payload.fch };
        case UPDATE_CHAPTERS:
          return { loading: true };
          case ADD_CHAPTER:return  { ...state, chapters: payload.chapterss };
          
    default:
      return state;
  }
};
export default chaptersreducer;