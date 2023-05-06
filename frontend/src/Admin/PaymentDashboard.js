import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Button, Col, Row } from 'reactstrap';
import UserBarChart from './UserBarChart';
import { useDispatch, useSelector } from 'react-redux';
import { getusers } from '../redux/Action/authAction';
import DarkFooter from '../Footers/DarkFooter';


const PaymentDashboard = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [totals, setTotals] = useState([]);
 // const [usersNumber, setUsersNumber] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getusers());
  }, []);

  const allUsers = useSelector((state) => state.Authreducer.users);
  const userCount = allUsers.filter((user) => user.role === "user").length;
  const coachCount = allUsers.filter((user) => user.role === "coach").length;
  const AdminCount = allUsers.filter((user) => user.role === "admin").length;


  

  useEffect(() => {
    axios.get('http://localhost:4000/api/users/getPayments')
      .then(res => setPaymentData(res.data))
      .catch(err => console.log(err));
  }, []);

  const chartRef = useRef(); // Create a reference for the chart canvas

  useEffect(() => {
    if (paymentData.length > 0 && chartRef.current) {
      const quizTypes = ['sport', 'musique', 'dance'];
      const quizTypeTotals = quizTypes.map(type => {
        const total = paymentData.reduce((acc, payment) => {
          if (payment.quizType === type) {
            acc += parseFloat(payment.amount.$numberDecimal);
          }
          return acc;
        }, 0);
        return { quizType: type, total };
      });

      setTotals(quizTypeTotals);

      const chartData = {
        labels: quizTypes,
        datasets: [
          {
            label: 'Payment Amount',
            data: quizTypeTotals.map(t => t.total),
            backgroundColor: ['#5b9bd5', '#ed7d31', '#a5a5a5'],
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        height: chartRef.current.clientHeight * 0.9,
        width: chartRef.current.clientWidth * 0.9,
      };

      if (chartRef.current.chart) {
        chartRef.current.destroy();
      }

      chartRef.current.chart = new Chart(chartRef.current, {
        type: 'pie',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [paymentData]);

  return (
    <>
    <div>
      <Row>
        <Col md="6">
          <div>
            <Row className="justify-content-center align-items-center">
              <Col md="10">
              <h1>Quiz income :</h1>

                <Button color="success" >
                  <h1>Total :💰 {totals.reduce((acc, t) => acc + t.total, 0)} 💰</h1>
                </Button>
                <Button color="primary" >
                <h1>Total gross:💰 {(totals.reduce((acc, t) => acc + t.total, 0) * 0.83).toFixed(2)} 💰</h1>
                </Button>
              </Col>
            </Row>
            <div className="chart-container">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </Col>
        <Col md="6">
          <div>
            <Row className="justify-content-center align-items-center">
              <Col md="10">
              <h1>Number of Users Logged In :</h1>
                <Button color="primary" >
                  <h1>Users :{userCount}</h1>
                </Button>
                <Button color="info" >
                  <h1>Coachs :{coachCount}</h1>
                </Button>
                <Button color="warning" >
                  <h1>Admins :{AdminCount}</h1>
                </Button>
              </Col>
              <UserBarChart/>

            </Row>
          </div>
        </Col>
      </Row>
      <br/>
      <br/>

      </div>
      <DarkFooter/>
    </>
  );
};

export default PaymentDashboard;
