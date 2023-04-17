import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button,FormText } from "reactstrap";
import "./financialaid.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const FinancialAidForm = () => {
  // State variables to store form field values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and submit form data to backend for processing
    // Here you can implement your own logic to process the financial aid form data
    // and send it to a backend server for further processing, e.g., making an API call

    // Set submitted state to true to show a success message
    setSubmitted(true);
  };

  return (
    <div className="background-white">
      {submitted ? (
        <div>
          <h3>Thank you for submitting the form!</h3>
          <p>We will review your application and contact you shortly.</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h2>Financial Aid Application Form</h2>
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
  );
};

export default FinancialAidForm;
