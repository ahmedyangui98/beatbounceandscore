import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/reducer/result_reducer'
import '../assets/styles/Main.css'
import {  useSelector } from "react-redux";
import { Button, Card } from 'reactstrap';
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
        <div className='start'>
      <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Quiz Part :</h1>
      </div>
        <div className='start'>

        <ol>
            <li style={{color:'blue', fontWeight: 'bold' }}>-The quiz will take 1 minute and 40 seconds and then it will end automatically.</li>
            <li style={{color:'blue', fontWeight: 'bold' }}>-You will be asked 10 questions one after another.</li>
            <li style={{color:'blue', fontWeight: 'bold' }}>-10 points is awarded for the correct answer.</li>
            <li style={{color:'blue', fontWeight: 'bold' }}>-Each question has three options. You can choose only one options.</li>
            <li style={{color:'blue', fontWeight: 'bold' }}>-You can review and change answers before the quiz finish.</li>
            <li style={{color:'blue', fontWeight: 'bold' }}>-The result will be declared at the end of the quiz.</li>
            
        </ol>
        </div>
    
        <div className="d-flex justify-content-between">
        <Card
          style={{
            width: "12rem",
            margin: " 4rem auto ",
            display: "flex",
            backgroundColor: "yellow",
            borderRadius:30,
            border:'solid',
            color:'black' ,
          }}

          disabled={true}
          
        >
          <div className="">
            <img alt=""  src={SportImg}></img>
          </div>
          <br/>

        
            <Link className='btn btn-round' style={{color:'yellow'}} to={'/quiz/sport'}  onClick={startQuiz}>Start Sport Quiz</Link>

        </Card>
        <Card
          style={{
            width: "12rem",
            margin: " 4rem auto ",
            display: "flex",
            backgroundColor: "yellow",
            borderRadius:30,
            border:'solid',
            color:'black'
           }}
        >
          <div className="">
            <img alt=""  src={MusicImg}></img>
          </div>
          <Link  style={{color:'yellow'}}  className='btn btn-round' to={'/quiz/musique'} onClick={startQuiz}>Start Music Quiz</Link>
            
        </Card>
        <Card
          style={{
            width: "12rem",
            margin: " 4rem auto ",
            display: "flex",
            backgroundColor: "yellow",
            borderRadius:30,
            border:'solid',
            color:'black'
          }}
        >
          <div className="">
            <img alt=""  src={DanceImg}></img>
          </div>
          <Link  style={{color:'yellow'}} className='btn btn-round' to={'/quiz/dance'} onClick={startQuiz}>Start Dance Quiz</Link>
        </Card>
        </div>
        

    </div>
    <DarkFooter/>
    </>
  )
}

export default Main;

