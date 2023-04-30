import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Button, Col, Row } from 'reactstrap';
import UserBarChart from './UserBarChart';


const PaymentDashboard = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/users/getPayments')
      .then(res => setPaymentData(res.data))
      .catch(err => console.log(err));
  }, []);

  const chartRef = useRef(); // Create a reference for the chart canvas

  useEffect(() => {
    if (paymentData.length > 0 && chartRef.current) {
      const quizTypes = ['sport', 'musique', 'dance'];
      const quizTotals = quizTypes.map(type => {
        const total = paymentData.reduce((acc, payment) => {
          if (payment.quizType === type) {
            acc += parseFloat(payment.amount.$numberDecimal);
          }
          return acc;
        }, 0);
        return total;
      });

      const chartData = {
        labels: quizTypes,
        datasets: [
          {
            label: 'Payment Amount',
            data: quizTotals,
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
      <Row>
        <Col md="6">
          <div>
            <Row className="justify-content-center align-items-center">
              <Col md="10">
              <h1>Total Quiz income :</h1>

                <Button class="primary" disabled={true}>
                  <h1>Primary</h1>
                </Button>
                <Button color="info" disabled={true}>
                  <h1>Info</h1>
                </Button>
                <Button color="success" disabled={true}>
                  <h1>Success</h1>
                </Button>
                <Button color="warning" disabled={true}>
                  <h1>Warning</h1>
                </Button>
                <Button color="danger" disabled={true}>
                  <h1>Danger</h1>
                </Button>
                <Button className="btn-neutral" color="default" disabled={true}>
                  <h1>Neutral</h1>
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
              <h1>Payment Dashboard - Column 2</h1>
                <Button color="primary" disabled={true}>
                  <h1>Primary</h1>
                </Button>
                <Button color="info" disabled={true}>
                  <h1>Info</h1>
                </Button>
                <Button color="success" disabled={true}>
                  <h1>Success</h1>
                </Button>
                <Button color="warning" disabled={true}>
                  <h1>Warning</h1>
                </Button>
                <Button color="danger" disabled={true}>
                  <h1>Danger</h1>
                </Button>
                <Button className="btn-neutral" color="default" disabled={true}>
                  <h1>Neutral</h1>
                </Button>
              </Col>
            </Row>
            <UserBarChart/>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PaymentDashboard;
