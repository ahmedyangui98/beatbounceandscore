import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const FinancialAidForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      income,
      expenses
    };

    try {
      // Make a POST request to your Node.js backend
      const response = await axios.post('https://beat-bounce-and-score-server.onrender.com/api/financialaid/financialaidapplyform', formData);
      console.log(response.data); // Optionally, do something with the response data
    } catch (error) {
      console.error(error);
    }
    setSubmitted(true);
  };

  return (
    <>
    <div className='container' >
      <div className='start'>
        <h1 style={{ fontSize: 55, color: 'black', fontWeight: 'bold' }}>Financial Aid Application Form</h1>
      </div>
      <div className="background-white">
        {submitted ? (
          <div>
            <h3>Thank you for submitting the form!</h3>
            <p>We will review your application and contact you shortly.</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} >
            <FormGroup>
              <Label for="firstName">First Name:</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name:</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="income">Annual Income:</Label>
              <Input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="expenses">Monthly Expenses:</Label>
              <Input
                type="number"
                id="expenses"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">
                parents' annual income document
              </Label>
              <h4>
                <FontAwesomeIcon icon={faUpload} />
              </h4>
              <Input
                id="exampleFile"
                name="file"
                type="file"
              />

            </FormGroup>
            <FormGroup tag="fieldset"></FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </div>
    </div>
  </>
  );
};

export default FinancialAidForm;
