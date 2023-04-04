import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/reducer/result_reducer'
import '../assets/styles/Main.css'
import {  useSelector } from "react-redux";
import { Card, Col } from 'reactstrap';
import SportImg from '../assets/img/sportu-quiz-contest-poster-blue-logo.png';
import MusicImg from '../assets/img/2898875.png';
import DanceImg from '../assets/img/png-clipart-blue-trademark.png';
import DarkFooter from '../Footers/DarkFooter'


const Main = () => {

    const dispatch = useDispatch();
    function startQuiz(){
            dispatch(setUserId(user._id))
    }
      const user = useSelector((state) => state.Authreducer.user);


  return (
    <>
    <div className='container'>
        <h1 className='title text-light start'>Quiz Part :</h1>
        <div className='start'>

        <ol>
            <li>-You will be asked 10 questions one after another.</li>
            <li>-10 points is awarded for the correct answer.</li>
            <li>-Each question has three options. You can choose only one options.</li>
            <li>-You can review and change answers before the quiz finish.</li>
            <li>-The result will be declared at the end of the quiz.</li>
        </ol>
        </div>
    
        <div className="d-flex justify-content-between">
        <Card
          style={{
            width: "12rem",
            margin: " 4rem auto ",
            display: "flex",
            backgroundColor: "yellow"
          }}
        >
          <div className="">
            <img alt=""  src={SportImg}></img>
          </div>
        
        
            <Link className='btn' to={'/quiz/sport'} onClick={startQuiz}>Start Sport Quiz</Link>
            
        </Card>
        <Card
          style={{
            width: "12rem",
            margin: " 4rem auto ",
            display: "flex",
            backgroundColor: "yellow"
          }}
        >
          <div className="">
            <img alt=""  src={MusicImg}></img>
          </div>
          <Link className='btn' to={'/quiz/musique'} onClick={startQuiz}>Start Music Quiz</Link>
            
        </Card>
        <Card
          style={{
            width: "12rem",
            margin: " 4rem auto ",
            display: "flex",
            backgroundColor: "yellow"
          }}
        >
          <div className="">
            <img alt=""  src={DanceImg}></img>
          </div>
          <Link className='btn' to={'/quiz/dance'} onClick={startQuiz}>Start Dance Quiz</Link>
        </Card>
        </div>
        

    </div>
    <DarkFooter/>
    </>
  )
}

export default Main;

