import React from 'react'
import '../assets/styles/Result.css';
import {  Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

import { usePublishResult } from '../hooks/setResult';

const ResultScoreBoard = () =>{

    const { questions : { queue ,answers}, result : { result, userId,types}}  = useSelector(state => state)
    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)

        usePublishResult({ 
            result, 
            username : userId,
            attempts,
            points: earnPoints,
            achived : flag ? "Passed" : "Failed" ,
            type : types}); 
    
        return <Navigate to={'/result'} replace={true}></Navigate>
  
}

export default ResultScoreBoard;
