import axios from "axios";
import { GET_CHAPTERS,UPDATE_CHAPTERS,DELETE_CHAPTERS, ADD_CHAPTER, FIND_CHAPTER} from "../Types/chapterTypes";


export const getchapters = () => async (dispatch) => {
    try {
      const res = await axios.get("/chapters/all");
      console.log(res.data);
      dispatch({ type: GET_CHAPTERS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
 
  export const deletechapters = (id) => async (dispatch,navigate) => {
    try {
      const res = await axios.delete(`/chapters/delete/${id}`);
      console.log(res.data);
      dispatch({ type: DELETE_CHAPTERS, payload: res.data });
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  export const findchapterbyid = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/chapters/find/${id}`);
      console.log(res.data);
      dispatch({ type: FIND_CHAPTER, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  export const updatechapters = (id,data) => async (dispatch) => {
    try {
      const res = await axios.put(`/chapters/edit/${id}`,data);
      dispatch({ type:UPDATE_CHAPTERS, payload: res.data });
    
      window.location.reload();
    } catch (error) {
     console.log(error)
     
    }
  };
  
  export const addcourses = (data) => async (dispatch) => {
    try {
      const res = await axios.post("/chapters/add",data);
      dispatch({ type:ADD_CHAPTER, payload: res.data });
    
      window.location.reload();
      console.log("added"+res)
    } catch (error) {
     console.log(error)
     
    }
  };