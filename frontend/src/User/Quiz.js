import React, { useState } from 'react'
import Questions from './Questions'
import {  useParams } from 'react-router-dom';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setTypes } from '../redux/reducer/result_reducer';

const Quiz = () =>{
    const { type } = useParams();
    

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()
    dispatch(setTypes(type));

    function onNext(){
        if(trace < queue.length){
            
            dispatch(MoveNextQuestion());

            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
            setChecked(undefined)
    }

    function onPrev(){
        if(trace > 0){
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/score'} replace={true}></Navigate>
    }

  return (
    <div className='container'>
        <h1 className='title text-light start'>Quiz of {type}</h1>

        <div className='start'>
        {/* display questions */}
        <Questions onChecked={onChecked} />
        </div>
        <div className='grid start'>
            { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
        
        
    </div>
  )
}


export default Quiz;
