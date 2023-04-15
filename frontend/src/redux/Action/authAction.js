import axios from "axios";
import {
  FAIL,
  GET_CURRENT,
  GET_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,FIND_USER,DELETE_USERS,UPDATE_USERS, RESET_PASSWORD, FORGOT_PASSWORD, CHANGE_PASSWORD, GET_RESULT,DELETE_RESULT,ADD_QUIZ
} from "../Types/authTypes";
import { alert_error } from "./errorActions";

export const register = (data, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/users/register", data);
    dispatch({ type: REGISTER, payload: res.data });
    navigate("/login");
    window.location.reload()
  } catch (error) {
    error.response.data.errors.forEach((el) => {
      dispatch(alert_error(el.msg));
    });
    dispatch({ type: FAIL, payload: error.response.data });
  }
};
export const login = (data, navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/users/login", data);
    dispatch({ type: LOGIN, payload: res.data });
    console.log(res.data);
    navigate("/profile");
    window.location.reload();
  } catch (error) {
    error.response.data.errors.forEach((el) => {
      dispatch(alert_error(el.msg));
    });
    dispatch({ type: FAIL, payload: error.response.data });
  }
};

export const get_current = () => async (dispatch) => {
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get("/users/current", config);
    dispatch({ type: GET_CURRENT, payload: res.data });
   // console.log(res.data)
  } catch (error) {
    console.log(error);
  }
};
export const getusers = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/all");
    //console.log(res.data);
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
export const logout = () => {
  return { type: LOGOUT };

};
export const deleteusers = (id) => async (dispatch,navigate) => {
  try {
    const res = await axios.delete(`/users/delete/${id}`);
    dispatch({ type: DELETE_USERS, payload: res.data });
    navigate("/profile");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const deleteresult = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/users/result/${id}`);
    dispatch({ type: DELETE_RESULT, payload: res.data });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const deleteYourAccount = (id) => async (dispatch,navigate) => {
  try {
    localStorage.removeItem("token");
    const res = await axios.delete(`/users/delete/${id}`);
    //console.log(res.data);
    dispatch({ type: DELETE_USERS, payload: res.data });
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
export const finduserbyid = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/find/${id}`);
    //console.log(res.data);
    dispatch({ type: FIND_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
export const updateusers = (id,data) => async (dispatch) => {
  try {
    const res = await axios.put(`/users/edit/${id}`,data);
    dispatch({ type:UPDATE_USERS, payload: res.data });
  
    window.location.reload();
  } catch (error) {
   console.log(error)
   
  }
};

export const update= (id,data,navigate) => async (dispatch) => {
  try {
    const res = await axios.put(`/users/editu/${id}`,data);
    dispatch({ type:UPDATE_USERS, payload: res.data });
  
    navigate("/profile");
    window.location.reload();
  } catch (error) {
    error.response.data.errors.forEach((el) => {
      dispatch(alert_error(el.msg));
    });
    dispatch({ type: FAIL, payload: error.response.data });
  }
};



export const sendPasswordLink = (data, navigate) => async (dispatch) => {
  try {
    //console.log(data);
    const res = await axios.post("/users/sendpasswordlink", data);
    dispatch({ type: RESET_PASSWORD, payload: res.data });
    navigate("/");
    window.location.reload();
  } catch (error) {
     console.log(error);
    
  }
};


export const ForgotPass = (id,token,navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/forgotpassword/${id}/${token}`);
   // console.log(res.data);
    dispatch({ type: FORGOT_PASSWORD, payload: res.data });
  } catch (error) {
    console.log(error);
    navigate("*")
  }
};



export const ChangePasswordWithIdandToken = (id,token,data,navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/changepassword/${id}/${token}`,data);
    dispatch({ type:CHANGE_PASSWORD, payload: res.data });
    navigate("/login");
    window.location.reload();
  } catch (error) {
   console.log(error)
   
  }
};


export const GetResultByIdResult = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/users/result/try/${id}`);
    dispatch({ type: GET_RESULT, payload: res.data.result });
    //console.log(res.data.result)

  } catch (error) {
    console.log(error);
  }
};

export const add_quiz = (data, navigate) => async (dispatch) => {
  try {
    await axios.post("/users/questions", data);
    dispatch({ type: ADD_QUIZ});
    navigate("/users");
    window.location.reload();

  } catch (error) {
   
  }
};


