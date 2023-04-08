import React from 'react'
import { Button,Form,FormGroup,Label,Col,Input,FormText } from 'reactstrap'
import { useState } from 'react';
import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../firebase";
  import { useDispatch } from 'react-redux';
  import { addcourses } from '../redux/Action/coursesAction';
  import { Navigate } from 'react-router-dom';
export default function AddCourses() {



    const handleadd = async (e) => {
        e.preventDefault();
       
    
       dispatch(
          addcourses( {CourseName,progression,level,type,image}),  
         
        );  window.location.reload();
 
        
     
      };


    const [image, setImage] = useState("");
    const [imagee, setImagee] = useState("");
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [email, setEmail] = useState("");
    const [  CourseName, setCourseName] = useState("");
    const [progression, setProgression] = useState(0);
    const [type, setType] = useState("");
    const [ level, setLevel] = useState("");
    const uploadFile = () => {
        if (imagee == null) return;
        const imageRef = ref(storage, `${imagee.name}`);
        uploadBytes(imageRef, imagee).then((snapshot) => {
          getDownloadURL(snapshot.ref);
        });
        alert("Uploaded successfully");
       // image.setImage(image.name);
      };  
     
    return(<div style={{height:"300px",width:"500px",color:"white"}}><Form>
    <FormGroup row>
      <Label
        for="exampleEmail"
        sm={2}
      >
        CourseName
      </Label>
      <Col sm={10}>
        <Input
         
          placeholder="course name"
          onChange={(e) => setCourseName(e.target.value)}
        />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label
      
        sm={2}
      >
        Type
      </Label>
      <Col sm={10}>
        <Input
         
          placeholder="type"
          type="text"
          onChange={(e) => setType(e.target.value)}/>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label
  
        sm={2}
      >
        Level
      </Label>
      <Col sm={10}>
        <Input
        
        
          placeholder="level"
          type="text" onChange={(e) => setLevel(e.target.value)}
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
      <Button className="btn-round" onClick={uploadFile}>Upload </Button>
    
    
      <FormGroup
    check
    row
  >
    <Col
      sm={{
        offset: 2,
        size: 10
      }}
    >
      <Button onClick={handleadd} >
        Submit
      </Button>
    </Col>
  </FormGroup>
  </Form></div>)
  
}
