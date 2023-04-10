import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetResultByIdResult } from '../redux/Action/authAction';
import { Card } from 'reactstrap';
import DarkFooter from '../Footers/DarkFooter';


const ResultDetails=()=> {

 

  const { type } = useParams();
  const { id } = useParams();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetResultByIdResult(id));
  }, []);
  const result =  useSelector((state) => state.Authreducer.result) ;


  const quiz = { questions: [
    {
        id: 1,
        question: "Where was the first World Cup ?",
        options: [
            "Uruguay",
            "Chile",
            "Brazil"
        ]
    },
    {
        id: 2,
        question: "Who won the 2010 World Cup? ",
        options: [
            "Spain",
            "Uruguay",
            "Germany"
        ]
    },
    {
        id: 3,
        question: "Who was the world No. 1 in tennis in 2008? ",
        options: [
            "Rafael Nadal",
            "Novak Djokovic ",
            "Roger Federer"
        ]
    },
    {
        id: 4,
        question: "How long does a rugby match last?",
        options: [
            "80 minutes",
            "60 minutes",
            "40 minutes"
        ]
    },
    {
        id: 5,
        question: "What are the colours of the five Olympic rings ?",
        options: [
            "Blue, yellow, green, red and black",
            "Blue, gray, green, red and black",
            "Blue, brown, green, red and black"
        ]
    },
    {
        id: 6,
        question: "Which team has won the most Champions League in history ?",
        options: [
            "Real Madrid",
            "Milan",
            "Bayen Munich"
        ]
    },
    {
        id: 7,
        question: "Who is considered the best basketball player of all time ?",
        options: [
            "LeBron James",
            "Micheal Jordan",
            "Magic Johnson"
        ]
    },
    {
        id: 8,
        question: "Who is the best goals scoorer player of all time?  ?",
        options: [
            "Cristiano Ronaldo",
            "Lionel Messi",
            "Josef Bican"
        ]
    },
    {
        id: 9,
        question: "Which magazine awards the Ballon d'Or ?",
        options: [
            "France Football magazine.",
            "World Soccer Magazine",
            "Four Four Two Magazine"
        ]
    },
    {
        id: 10,
        question: "How  much  player's number  in futsal  game ?",
        options: [
            "5 players X 2 Teams",
            "6 players X 2 Teams",
            "7 players X 2 Teams"
        ]
    }
],
answers: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
],
type : "sport"
}



  return (
  <>  
    <div >
    <div className='container'>
      <div className='start'>
      <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Your {quiz.type} Quiz Try :</h1>
      </div>

      <br />
      <Card className='result flex-center' style={{backgroundColor:'#17a2b8',borderRadius:10,border:'solid'}}>
        <div className='start'>
        <ol>
          {quiz.questions.map((question, index) => (
            <li key={question.id}>
              <p style={{fontSize:35,color:'black', fontWeight: 'bold' }}>{index+1}-{question.question}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    {result?.result?.[index] === optionIndex && quiz.answers?.[index] === optionIndex ? (
                      <span style={{ color: 'green' }}>-{question.options[optionIndex]}</span>
                    ) : result?.result?.[index] === optionIndex ?(
                      <span style={{ color: 'red' }}>-{question.options[optionIndex]}</span>
  
                    ): (
                      <span>-{option}</span>
                    )}
                  </li>
                ))}
                 {result?.result?.[index] !== quiz.answers?.[index] ?(
                    <>
                      <span style={{ color: 'orange' }}> The correct one is {question.options[quiz.answers?.[index]]} !</span>
                    </>
                    ) : (
                      <span style={{ color: 'green' }}>-Your response is True !</span>
                    )}
              </ul>
            </li>
          ))}
        </ol>
        </div>
      </Card>
      <br />
    </div>
  </div>
  <DarkFooter/>
  </>


  );
}

export default ResultDetails;