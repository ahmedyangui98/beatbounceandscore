
import { GET_COURSES,UPDATE_COURSES,DELETE_COURSES, ADD_COURSE, FIND_COURSE} from "../Types/coursesTypes";
import axios from "axios";

export const getcourses = () => async (dispatch) => {
    try {
      const res = await axios.get("/courses/all");
      console.log(res.data);
      dispatch({ type: GET_COURSES, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
 
  export const deletecourses = (id) => async (dispatch,navigate) => {
    try {
      const res = await axios.delete(`/courses/delete/${id}`);
      console.log(res.data);
      dispatch({ type: DELETE_COURSES, payload: res.data });
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  export const findcoursebyid = (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/courses/find/${id}`);
      console.log(res.data);
      dispatch({ type: FIND_COURSE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  export const updatecourses = (id,data) => async (dispatch) => {
    try {
      const res = await axios.put(`/courses/edit/${id}`,data);
      dispatch({ type:UPDATE_COURSES, payload: res.data });
    
      window.location.reload();
    } catch (error) {
     console.log(error)
     
    }
  };
  
  export const addcourses = (data) => async (dispatch) => {
    try {
      const res = await axios.post("/courses/add",data);
      dispatch({ type:ADD_COURSE, payload: res.data });
    
      window.location.reload();
      console.log("added"+res)
    } catch (error) {
     console.log(error)
     
    }
  };