import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {deleteusers} from "./redux/Action/authAction"
<<<<<<< HEAD
const Usercard = ({ el }) => {
  const dispatch = useDispatch();
=======
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateusers } from "./redux/Action/authAction";
import  { useState ,useRef} from "react";

const Usercard = ({ el }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState(el.email);
  const [name, setName] = useState(el.name);
  const [role, setRole] = useState(el.role);
  const [image, setImage] = useState("");
  const inputRef = useRef();
  const handleShow = () => setShow(true);
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(
      updateusers(el._id, { name,email,role }),
      handleClose()
    );
  };
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
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
            <ListGroup.Item>role {el.role}</ListGroup.Item>
            <ListGroup.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="danger" onClick={() => dispatch(deleteusers(el._id))}>DELETE</Button>
<<<<<<< HEAD
           
=======
              <Button variant="warning" onClick={handleShow}>edit</Button>
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                   
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="role"
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                    />
                  </Form.Group>
                 
                  <Form.Group className="mb-3">
                    <Form.Label>image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="image"
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                    />
                  </Form.Group>

                  
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="warning" onClick={handleEdit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
      </div>
    </div>
  );
};

export default Usercard;
