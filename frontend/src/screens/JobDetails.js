import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Card,Spinner,Button  } from 'react-bootstrap'

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/offers/getJobDetails')
      .then(response => {
        setJobDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-3">
    <Card  text="white" >
      <Card.Header>
        <Card.Title>{jobDetails.company}</Card.Title>
      </Card.Header>
      <Card.Body >
        <Card.Text style={{ color: "white" }}>Secteur: {jobDetails.secteur}</Card.Text>
        <Card.Text style={{ color: "white" }}>Description: {jobDetails.description}</Card.Text>
      </Card.Body>
      <Button variant="primary">Apply</Button>

    </Card>
    {isLoading && (
      <div className="text-center mt-3">
        <Spinner animation="border" />
      </div>
    )}
  </div>
  );

  

    



};

export default JobDetails;
