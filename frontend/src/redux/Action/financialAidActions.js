import axios from "axios";
import { showNotification } from "../Action/notificationAction";
import { DELETE_FORM, GET_FORM}  from "../Types/financialaidTypes";




export const deleteFinancialAidForm = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/financialaid/${id}`);
    dispatch({ type: DELETE_FORM, payload: res.data });
    window.location.reload();
  } catch (error) {
    //console.log(error);
  }
};

export const getFinancialAidFormById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/financialaid/${id}`);
    dispatch({ type: GET_FORM, payload: res.data.result });
    //console.log(res.data.result)

  } catch (error) {
    //console.log(error);
  }
};