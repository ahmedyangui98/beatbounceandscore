import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import QuizPaymentPage from './QuizPaymentPage';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51MuFezE4ZELlhZxQHKLSVz36ZokRUYqxxmFtn0Sdps6j3sqKjpUh9fE0amhByM71jlB0L3bTCEfz7ZDhq4uBbRHI00w47cOZIE');

const QuizPay = () => {
    const { type } = useParams();

    return (
        <>
            <div >
                <div className='container'>
                    <div className='start'>
                        <h1 style={{ fontSize: 55, color: 'black', fontWeight: 'bold' }}> Quiz Pay :</h1>
                    </div>
                    <Elements stripe={stripePromise}>
                        <QuizPaymentPage quizType={type} quizPrice={29.99} />
                    </Elements>
                </div>
            </div>
        </>

    );
};

export default QuizPay;