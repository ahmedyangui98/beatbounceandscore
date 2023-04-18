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
import { getServerData, getServerData1, getServerData2 } from '../helper/helper'

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
    getServerData(`http://localhost:4000/api/users/getPayment/sport`, (res) => {
        setSportIsExist(res)
    });
    getServerData(`http://localhost:4000/api/users/getPayment/musique`, (res) => {
      setMusiqueIsExist(res)
      getServerData(`http://localhost:4000/api/users/getPayment/dance`, (res) => {
        setDanceIsExist(res)
    });
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
            <li style={{ color: 'blue', fontWeight: 'bold' }}>-The quiz will take 1 minute and 40 seconds and then it will end automatically.</li>
            <li style={{ color: 'blue', fontWeight: 'bold' }}>-You will be asked 10 questions one after another.</li>
            <li style={{ color: 'blue', fontWeight: 'bold' }}>-10 points is awarded for the correct answer.</li>
            <li style={{ color: 'blue', fontWeight: 'bold' }}>-Each question has three options. You can choose only one options.</li>
            <li style={{ color: 'blue', fontWeight: 'bold' }}>-You can review and change answers before the quiz finish.</li>
            <li style={{ color: 'blue', fontWeight: 'bold' }}>-The result will be declared at the end of the quiz.</li>

          </ol>
        </div>

        <div className="d-flex justify-content-between">
        {sportIsExist && sportIsExist.quizType === "sport" ? (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "yellow",
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
      style={{ color: "yellow" }}
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
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "yellow",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={SportImg} />
      <h3 style={{color:"yellow"}} className='btn-danger btn-round' >Not Payed</h3>

    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "yellow" }}
      to={"/pay/sport"}

    >
      Pay Now
    </Link>
    <br />
  </Card>
) }

{musiqueIsExist && musiqueIsExist.quizType === "musique" ? (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "yellow",
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
      style={{ color: "yellow" }}
      to={"/quiz/musique"}
      onClick={startQuiz}

    >
      Start Musique Quiz
    </Link>
    <br />
  </Card>
) :  (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "yellow",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={SportImg} />
      <h3 style={{color:"yellow"}} className='btn-danger btn-round' >Not Payed</h3>

    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "yellow" }}
      to={"/pay/musique"}

    >
      Pay Now For musique
    </Link>
    <br />
  </Card>
) }

{danceIsExist && danceIsExist.quizType === "dance" ? (
  <Card
    style={{
      width: "12rem",
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "yellow",
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
      style={{ color: "yellow" }}
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
      margin: " 4rem auto ",
      display: "flex",
      backgroundColor: "yellow",
      borderRadius: 30,
      border: "solid",
      color: "black"
    }}
  >
    <div className="">
      <img alt="" src={DanceImg} />
      <h3 style={{color:"yellow"}} className='btn-danger btn-round' >Not Payed</h3>

    </div>
    <br />
    <Link
      className="btn btn-round"
      style={{ color: "yellow" }}
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
