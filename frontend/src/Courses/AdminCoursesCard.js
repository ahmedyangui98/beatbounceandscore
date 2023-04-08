import React, { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {deleteusers} from "../redux/Action/authAction"
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateusers } from "../redux/Action/authAction"
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { update } from "../redux/Action/authAction";
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
  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState(el.email);
  const [  CourseName, setCourseName] = useState(el.CourseName);
  const [progression, setProgression] = useState(el.progression);
  const [type, setType] = useState(el.type);
  const [ level, setLevel] = useState(el?.level);
  const [creationDate , setCreationDate ] = useState(el.creationDate);
  const [selectedOption, setSelectedOption] = useState(null);
const [options,setOptions]=useState([
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
      updatecourses(el._id, {CourseName,progression,level,type,expirationDate,image},Navigate),  
      window.location.reload()
      
    ); handleClose()
 
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
          <div className="photo-container">
            <img alt=""  src={`https://firebasestorage.googleapis.com/v0/b/beatbounceandscore.appspot.com/o/${el.image}?alt=media&token=894834e1-f47f-4826-b6dc-8801bcae91aa`}></img>
          </div>
            <ListGroup.Item>Coursename :{el.CourseName}</ListGroup.Item>
         
            <ListGroup.Item>type :{el.type}</ListGroup.Item>
            <ListGroup.Item>level :{el.level}</ListGroup.Item>
            <ListGroup.Item>creationDate :{el.creationDate}</ListGroup.Item>
            <ListGroup.Item>expirationDate :{el.expirationDate}</ListGroup.Item>

            <ListGroup.Item
              
            >
              <Button variant="danger" className="btn-round" size="lg" onClick={() => dispatch(deletecourses(el._id))}>DELETE</Button>
             
             

              <Button variant="warning" className="btn-round" size="lg" onClick={handleShow}>edit</Button>
              </ListGroup.Item>ListGroup.Item
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
                    <Form.Label>Progression</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      onChange={(e) => setProgression(e.target.value)}
                      value={progression}
                    />
                   
                  </Form.Group>

                
              
                  <Form.Group className="mb-3">
                    <Form.Label>expirationDate</Form.Label>
                    <Form.Control
                      type="Date"
                    
                      onChange={(e) => setExpirationDate(e.target.value)}
                      value={expirationDate}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>level</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="role"
                      onChange={(e) => setLevel(e.target.value)}
                      value={level}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="role"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    />
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
};

export default AdminCoursesCard;