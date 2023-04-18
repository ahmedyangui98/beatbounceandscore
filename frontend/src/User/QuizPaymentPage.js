import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { get_current } from '../redux/Action/authAction';


const QuizPaymentPage = ({ quizType, quizPrice }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaymentError, setShowPaymentError] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);


  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_current())
  },);
  


  const user = useSelector((state) => state.Authreducer.user);

  const [userId, setUserId] = useState(user._id);



  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      // payment success
      setPaymentSuccess(true);
      setShowPaymentSuccess(true); // show the payment success message

      const { id } = paymentMethod;
      try {
        const { data } = await axios.post('http://localhost:4000/api/users/createpayment', {
          id,
          amount: quizPrice * 100,
          quizType,
          userId:userId
        });
      } catch (error) {
        // payment error
        setPaymentError('An error occurred while processing your payment');
        setShowPaymentError(true); // show the payment error message
      }
    } else {
      // payment error
      setPaymentError(error.message);
      setShowPaymentError(true); // show the payment error message
    }
  };

  useEffect(() => {
    let timer;
    if (showPaymentSuccess) {
      timer = setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 3000); // hide payment success message after 3 seconds
    }
    if (showPaymentError) {
        timer = setTimeout(() => {
          setShowPaymentError(false);
        }, 3000); // hide payment success message after 3 seconds
      }
    return () => {
      clearTimeout(timer);
    };
  }, [showPaymentSuccess]);

  return (
    <div className="quiz-payment-page">
      <h2>Payment for {quizType} Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Pay ${quizPrice}</button>
      </form>
      {showPaymentError && paymentError && (
        <div className="alert alert-danger">{paymentError}</div>
      )}
      {showPaymentSuccess && (
        <div className="alert alert-success">Payment successful!</div>
      )}
    </div>
  );
};

export default QuizPaymentPage;