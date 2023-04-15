import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetQuizByType, GetResultByIdResult } from '../redux/Action/authAction';
import { Card } from 'reactstrap';
import DarkFooter from '../Footers/DarkFooter';


const ResultDetails=()=> {


  const { type } = useParams();
  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetResultByIdResult(id));
     dispatch(GetQuizByType(type));

  }, /*[]*/);
  const result =  useSelector((state) => state.Authreducer.result) ;
  const quiz = useSelector((state) => state.Authreducer.quiz);
  
  
  return (
  <>  
    <div >
    <div className='container'>
      <div className='start'>
      <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>{quiz.type } Quiz Try :</h1>
      </div>

      <br />
      <Card className='result flex-center' style={{backgroundColor:'#17a2b8',borderRadius:10,border:'solid'}}>
        <div className='start'>
        <ol>
          {quiz?.questions?.map((question, index) => (
            <li key={question?.id}>
              <p style={{fontSize:35,color:'black', fontWeight: 'bold' }}>{index+1}-{question?.question}</p>
              <ul>
                {question?.options?.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    {result?.result?.[index] === optionIndex && quiz.answers?.[index] === optionIndex ? (
                      <span style={{ color: 'green' }}>-{question?.options[optionIndex]}</span>
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
                      <span style={{fontSize:15, fontWeight: 'bold' }} > 0/10 Points</span>

                    </>
                    ) : (
                      <>
                      <span style={{ color: 'green' }}>-Your response is True !</span>
                      <span  style={{fontSize:15, fontWeight: 'bold' }} >10/10 Points</span>
                      </>
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