import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/reducer/result_reducer'
import '../assets/styles/Main.css'
import {  useSelector } from "react-redux";

const Main = () => {

    const dispatch = useDispatch();
    function startQuiz(){
            dispatch(setUserId(user._id))
    }
      const user = useSelector((state) => state.Authreducer.user);


  return (
    <div className='container'>
        <h1 className='title text-light start'>Quiz Part :</h1>
        <div className='start'>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>
        </div>
        <div className='start'>
            <Link className='btn' to={'/quiz/sport'} onClick={startQuiz}>Start Sport Quiz</Link>
        </div>
        <div className='start'>
            <Link className='btn' to={'/quiz/musique'} onClick={startQuiz}>Start Music Quiz</Link>
        </div>
        <div className='start'>
            <Link className='btn' to={'/quiz/dance'} onClick={startQuiz}>Start Dance Quiz</Link>
        </div>

    </div>
  )
}

export default Main;

