import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from '../redux/reducer/question_reducer'

export const useFetchQestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});
    const { result : { types}}  = useSelector(state => state)

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        /**  fetch backend data */
        (async () => {
            try {
                const [{ questions, answers }] = await getServerData(`http://localhost:4000/api/users/questions/${types}`, (data) => data)
                
                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : questions}));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question : questions, answers }))

                } else{
                    throw new Error("No Question Avalibale");
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}


