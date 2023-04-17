import React from 'react'
import { Button, Form, FormGroup, Label, Col, Input, FormText } from 'reactstrap'
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useDispatch } from 'react-redux';
import { addcourses } from '../redux/Action/coursesAction';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { get_current, getusers } from '../redux/Action/authAction';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AddCourses() {
  const navigate = useNavigate();
  const [coach, setCoach] = useState("");
  useEffect(() => {
    dispatch(getusers());
    dispatch(get_current());
  }, []);
  const users = useSelector((state) => state.Authreducer.users);
  const user = useSelector((state) => state.Authreducer.user);
  const dispatch = useDispatch();
  const handleadd = async (e) => {
    e.preventDefault();

    dispatch(
      addcourses({ CourseName, progression, level, type, image, coach }),
    );

    navigate("/admincourses")
    window.location.reload();
  };

  const handleChange = (event) => {
    const { options } = event.target;
    let selectedValue = null;

    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedValue = options[i].value;
        break;
      }
    }

    setCoach(selectedValue);
  };
  const [image, setImage] = useState("");
  const [imagee, setImagee] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState("");
  const [CourseName, setCourseName] = useState("");
  const [progression, setProgression] = useState(0);
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");

  const uploadFile = () => {
    if (imagee == null) return;
    const imageRef = ref(storage, `${imagee.name}`);
    uploadBytes(imageRef, imagee).then((snapshot) => {
      getDownloadURL(snapshot.ref);
    });
    alert("Uploaded successfully");
    // image.setImage(image.name);
  };

  return (
    <>
      <div className="container">
      <div className='start'>
            <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Add Course :</h1>
          </div>
        <div className="start">
          <div
            style={{
              height: "600px",
              width: "700px",
              color: "white",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid white",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px auto",
            }}
          >
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>CourseName</Label>
                <Col sm={10}>
                  <Input
                    placeholder="course name"
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Coach</Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    multiple
                    onChange={handleChange}
                    style={{ color: "black" }}
                  >
                    {users.map((option) =>
                      option.role == "coach" ? (
                        <option key={option._id} value={option._id}>
                          {option.lastname}
                        </option>
                      ) : null
                    )}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Type</Label>
                <Col sm={10}>
                  <Input
                    placeholder="type"
                    type="text"
                    onChange={(e) => setType(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3}>Level</Label>
                <Col sm={10}>
                  <Input
                    placeholder="level"
                    type="text"
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </Col>
              </FormGroup>
              
              <Input
                type="file"
                onChange={(event) => {
                  setImagee(event.target.files[0]);
                  setImage(event.target.files[0].name);
                }}
              />
               <FormGroup row>
                <Col sm={10}>
                <Button className="btn-round" onClick={uploadFile}>
                Upload
              </Button>

                </Col>
              </FormGroup>
              
              <FormGroup check row>
                <Col sm={{ offset: 2, size: 10 }}>
                  <Button onClick={handleadd}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}