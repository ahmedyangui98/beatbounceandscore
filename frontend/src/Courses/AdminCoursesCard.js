import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteusers, finduserbyid, getusers } from "../redux/Action/authAction"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateusers } from "../redux/Action/authAction"
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { update } from "../redux/Action/authAction";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { get_current } from "../redux/Action/authAction";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import { Navigate } from "react-router-dom";
import { deletecourses, updatecourses } from "../redux/Action/coursesAction";

const AdminCoursesCard = ({ el }) => {
  //const chapters = useSelector((state) => state.chaptersreducer?.chapters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState(el.email);
  const [CourseName, setCourseName] = useState(el.CourseName);
  const [progression, setProgression] = useState(el.progression);
  const [type, setType] = useState(el.type);
  const [level, setLevel] = useState(el?.level);


  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    { value: 'easy', label: 'easy' },
    { value: 'medium', label: 'medium' },
    { value: 'hard', label: 'hard' },
  ])

  const [expirationDate, setExpirationDate] = useState(el.expirationDate);
  const [image, setImage] = useState(el.image);
  const [imagee, setImagee] = useState("");
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleShow = () => setShow(true);
  const handleEdit = async (e) => {
    e.preventDefault();

   dispatch(
      updatecourses(el._id, {CourseName,type,level,expirationDate,image},navigate),  
     
      
    ); 
    handleClose();
    window.location.reload()

  };


  const uploadFile = () => {
    if (imagee == null) return;
    const imageRef = ref(storage, `${imagee.name}`);
    uploadBytes(imageRef, imagee).then((snapshot) => {
      getDownloadURL(snapshot.ref);
    });
    window.alert("Uploaded successfully");
    // image.setImage(image.name);
  };
  useEffect(() => {
    dispatch(get_current())
    dispatch(finduserbyid(el?.coach))
    dispatch(getusers())

  }/*, []*/);
  const user = useSelector((state) => state.Authreducer.user);
  const users = useSelector((state) => state.Authreducer.users);

  const c = useSelector((state) => state.Authreducer.fu);
  const filteredUsers = users.filter((user) => user._id === el.coach);

  if ((user.role === "admin") || (user._id === el.coach)) {
    return (
      <div style={{ backgroundColor: 'lightblue' }}>
        <div>
          <Card
            style={{
              width: "20rem",
              margin: " 4rem auto ",
              display: "flex",
              backgroundColor:"lightblue"
            }}
          >
            <ListGroup variant="flush">
              <div className="photo-container">
                <img alt="" src={`https://firebasestorage.googleapis.com/v0/b/beatbounceandscore.appspot.com/o/${el.image}?alt=media&token=894834e1-f47f-4826-b6dc-8801bcae91aa`}></img>
              </div>
              <ListGroup.Item>Coursename :{el.CourseName}</ListGroup.Item>

              <ListGroup.Item>type :{el.type}</ListGroup.Item>
              <ListGroup.Item>level :{el.level}</ListGroup.Item>
              <ListGroup.Item>creationDate :{el.creationDate}</ListGroup.Item>
              <ListGroup.Item>expirationDate :{el.expirationDate}</ListGroup.Item>
              {el.coach != null && <ListGroup.Item>Coach :{filteredUsers[0]?.firstname}</ListGroup.Item>}

              <ListGroup.Item

              >
                {user.role == "admin" && <Button variant="danger" className="btn-round" size="lg" onClick={() => dispatch(deletecourses(el._id))}>DELETE</Button>

                }

                {user.role == "admin" && <Button variant="warning" className="btn-round" size="lg" onClick={handleShow}>edit</Button>}
              </ListGroup.Item>
              <ListGroup.Item

              >

                <Button variant="info" className="btn-round" size="lg" href={`/chaptersadmin/${el._id}`} >MODIFY CHAPTERS</Button>
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
                  <Form.Label>CourseName</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Coursename"
                    onChange={(e) => setCourseName(e.target.value)}
                    value={CourseName}
                  />

                </Form.Group>




                <Form.Group className="mb-3">
                  <Form.Label>expirationDate</Form.Label>
                  <Form.Control
                    type="Date"
                    onChange={(e) => setExpirationDate(e.target.value)}
                    value={expirationDate ? expirationDate : Date.now}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Level</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setLevel(e.target.value)}
                    value={level}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option value="sport">Sport</option>
                    <option value="musique">Musique</option>
                    <option value="dance">Dance</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>image</Form.Label>
                  <Form.Control
                    type="file"

                    onChange={(event) => {
                      setImagee(event.target.files[0]);
                      setImage(event.target.files[0].name);
                    }}

                  />
                </Form.Group>
                <Button className="btn-round" onClick={uploadFile}>Upload </Button>


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
  } else return (<></>)

};

export default AdminCoursesCard;