import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import { useParams, Navigate } from 'react-router-dom';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { useSelector, useDispatch } from 'react-redux';
import { setTypes } from '../redux/reducer/result_reducer';
import { Card } from 'reactstrap';
import DarkFooter from '../Footers/DarkFooter';

const Quiz = () => {
  const { type } = useParams();

  const [check, setChecked] = useState(undefined);
  const [timer, setTimer] = useState(100); 
  const result = useSelector(state => state.result.result);
  const { queue, trace } = useSelector(state => state.questions);
  const dispatch = useDispatch();
  dispatch(setTypes(type));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  function onNext() {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());

      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
  }

  /** finished exam after the last question */
  if ((result.length && result.length >= queue.length)||((timer === 0))) {
    return <Navigate to={'/score'} replace={true}></Navigate>;
  }

  return (
    <>
      <div className='container'>
        <div className='start'>
          <h1 style={{ fontSize: 55, color: 'black', fontWeight: 'bold' }}>Quiz of {type}</h1>
        </div>

        <Card style={{ backgroundColor: '#17a2b8', borderRadius: 100 }}>
        <div className='start'>
        <h3>Time left :
             <span style={{ fontWeight: 'bold', color: timer <= 20 ? 'red' : timer <= 120 ? 'green' : 'black'}}>
            {timer < 60 ? `${timer} seconds` : `${Math.floor(timer / 60)} minutes and ${timer % 60} seconds`}
            {timer <= 20 ? ', Hurry Up' : ''}</span>
        </h3>
        </div>

          <div className='start'>
            {/* display questions */}
            <Questions onChecked={onChecked} />
          </div>
          <div className='grid start'>
            {trace > 0 ? (
              <button className='btn prev' onClick={onPrev}>
                Prev
              </button>
            ) : (
              <div></div>
            )}
            <button className='btn next' onClick={onNext}>
              Next
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Quiz;
