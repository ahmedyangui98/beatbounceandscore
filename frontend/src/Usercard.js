import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const Usercard = ({ el }) => {
  return (
    <div>
      <div>
        <Card
          style={{
            width: "20rem",
            margin: " 4rem auto ",
            display: "flex",
          }}
        >
          <ListGroup variant="flush">
            <ListGroup.Item>name {el.name}</ListGroup.Item>
            <ListGroup.Item>email {el.email}</ListGroup.Item>

            <ListGroup.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="danger">DELETE</Button>
              <Button variant="warning">EDIT</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default Usercard;
