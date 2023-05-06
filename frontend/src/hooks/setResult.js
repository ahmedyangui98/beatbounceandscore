import {  getServerData, postServerData } from '../helper/helper'
import * as Action from '../redux/reducer/result_reducer'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/** insert user data */
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    ( () => {
        try {
            if(result !== [] && !username) throw new Error("Couldn't get Result");
             postServerData("https://beat-bounce-and-score-server.onrender.com/api/users/result", resultData, data => data)
            // window.location.reload()
        } catch (error) {
           // console.log(error)
        }
    })();
}


/** */
export const GetResultByidRes = (id) => {
    try {
      if (id === "") throw new Error("Couldn't get Result");
      const data = getServerData(`https://beat-bounce-and-score-server.onrender.com/api/users/result/try/${id}`, data => data);
    //   console.log(data)
      return { success: true, data };
    } catch (error) {
      // console.log(error)
      return { success: false, error: error.message };
    }
  };