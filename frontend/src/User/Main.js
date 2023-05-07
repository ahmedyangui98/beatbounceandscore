import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/reducer/result_reducer'
import '../assets/styles/Main.css'
import { useSelector } from "react-redux";
import { Button, Card, Label } from 'reactstrap';
import SportImg from '../assets/img/sportu-quiz-contest-poster-blue-logo.png';
import MusicImg from '../assets/img/2898875.png';
import DanceImg from '../assets/img/png-clipart-blue-trademark.png';
import DarkFooter from '../Footers/DarkFooter'
import { getServerData } from '../helper/helper'

const Main = () => {

  const dispatch = useDispatch();
  function startQuiz() {
    dispatch(setUserId(user._id))
  }
  const user = useSelector((state) => state.Authreducer.user);

  const [sportIsExist, setSportIsExist] = useState();
  const [musiqueIsExist, setMusiqueIsExist] = useState();
  const [danceIsExist, setDanceIsExist] = useState();

  useEffect(() => {
    getServerData(`https://beat-bounce-and-score-server.onrender.com/api/users/getPayment/sport/${user._id}`, (res) => {
        setSportIsExist(res)
    });
    getServerData(`https://beat-bounce-and-score-server.onrender.com/api/users/getPayment/musique/${user._id}`, (res) => {
      setMusiqueIsExist(res)    });

      getServerData(`https://beat-bounce-and-score-server.onrender.com/api/users/getPayment/dance/${user._id}`, (res) => {
        setDanceIsExist(res)
    });
  }, [])
 


  return (
    <>
      <div className='container'>
        <div className='start'>
          <h1 style={{ fontSize: 55, color: 'black', fontWeight: 'bold' }}>Quiz Part :</h1>
        </div>
        <div className='start'>

          <ol>
            <li style={{ color: 'black', fontWeight: 'bold' }}>-The quiz will take 1 minute and 40 seconds and then it will end automatically.</li>
            <li style={{ color: 'black', fontWeight: 'bold' }}>-You will be asked 10 questions one after another.</li>
            <li style={{ color: 'black', fontWeight: 'bold' }}>-10 points is awarded for the correct answer.</li>
            <li style={{ color: 'black', fontWeight: 'bold' }}>-Each question has three options. You can choose only one options.</li>
            <li style={{ color: 'black', fontWeight: 'bold' }}>-You can review and change answers before the quiz finish.</li>
            <li style={{ color: 'black', fontWeight: 'bold' }}>-The result will be declared at the end of the quiz.</li>

          </ol>
        </div>

        <div className="d-flex justify-content-between">
        {sportIsExist?.userId===user._id && sportIsExist?.quizType === "sport" ? (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "#17a2b8",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={SportImg} />
    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "white" }}
      to={"/quiz/sport"}
      onClick={startQuiz}
    >
      Start Sport Quiz
    </Link>
    <br />
  </Card>
) :  (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem  ",
      display: "flex",
      backgroundColor: "#17a2b8",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={SportImg} />
      <Label style={{color:"white"}} className='btn-danger btn-round' >Not Payed</Label>

    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "white" }}
      to={"/pay/sport"}

    >
      Pay Now For Sport 
    </Link>
    <br />
  </Card>
) }

{musiqueIsExist?.userId===user._id && musiqueIsExist?.quizType === "musique" ? (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem  ",
      display: "flex",
      backgroundColor: "#17a2b8",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={MusicImg} />
    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "white" }}
      to={"/quiz/musique"}
      onClick={startQuiz}

    >
      Start Music Quiz
    </Link>
    <br />
  </Card>
) :  (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem  ",
      display: "flex",
      backgroundColor: "#17a2b8",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={MusicImg} />
      <Label style={{color:"white"}} className='btn-danger btn-round' >Not Payed</Label>

    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "white" }}
      to={"/pay/musique"}

    >
      Pay Now For music
    </Link>
    <br />
  </Card>
) }

{danceIsExist?.userId===user._id && danceIsExist?.quizType === "dance" ? (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem  ",
      display: "flex",
      backgroundColor: "#17a2b8",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={DanceImg} />
    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "white" }}
      to={"/quiz/dance"}
      onClick={startQuiz}
      // Disable the card if the payment for sport quiz has not been made
      //disabled={!sportQuizPaid}
    >
      Start Dance Quiz
    </Link>
    <br />
  </Card>
) :  (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem  ",
      display: "flex",
      backgroundColor: "#17a2b8",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={DanceImg} />
      <Label style={{color:"white"}} className='btn-danger btn-round' >Not Payed</Label>

    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "white" }}
      to={"/pay/dance"}
    >
      Pay Now For Dance
    </Link>
    <br />
  </Card>
) } 


        </div>


      </div>
      <DarkFooter />
    </>
  )
}

export default Main;
