import React from 'react'
import '../assets/styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import { resetAllAction } from '../redux/reducer/question_reducer';
import { resetResultAction } from '../redux/reducer/result_reducer';
import { Card } from 'reactstrap';
import DarkFooter from '../Footers/DarkFooter';

const Result = () =>{
    const dispatch = useDispatch()

    const { questions : { queue ,answers}, result : { result, types}}  = useSelector(state => state)

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)


    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }    

  return (
    <>
    <div className='container'>
        <div className='start'>
      <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Result :</h1>
      </div>
        <br/>
        <Card className='result flex-center' style={{backgroundColor:'#17a2b8',borderRadius:10,border:'solid'}}>

            <div className='flex'>
                <span>Total Quiz Points : </span>
                <h3 className='bold'>{totalPoints || 0}</h3>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <h3 className='bold'>{ queue.length || 0}</h3>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <h3 className='bold'>{attempts || 0}</h3>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <h3 className='bold'>{earnPoints || 0}</h3>
            </div>
            <div className='flex'>
                <span>Quiz Type :</span>
                <h3 className='bold'>{types || ""}</h3>
            </div>
            <div className='flex'>
                <span>Quiz Status</span>
                <h3 style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</h3>
            </div>
            <div className="start">
            <Link className='btn' to={'/quiz'} onClick={onRestart} >Restart</Link>
        </div>
        </Card>

    </div>
    <DarkFooter/>
    </>

  )
}


export default Result;
