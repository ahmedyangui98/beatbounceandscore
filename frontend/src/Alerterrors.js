import React from "react";

import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
const Alerterrors = () => {
  const errors = useSelector((state) => state.errorreducer);
  return (
    <div>
      
      {errors.map((el) => (
        <Alert variant="danger">
          <Alert.Heading>{el.msg}</Alert.Heading>
        </Alert>
      ))}
    </div>
  );
};

export default Alerterrors;
