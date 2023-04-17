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
  import { useEffect } from 'react';
  import { useSelector } from 'react-redux';
  import { getcourses } from '../redux/Action/coursesAction';
import { addchapter } from '../redux/Action/chapterAction';
import { useNavigate } from 'react-router-dom';
export default function AddChapter() {
const navigate=useNavigate()
    const [course, setCourse] = useState(null);
   
 
      

    const handleadd = async (e) => {
        e.preventDefault();
       
    
       dispatch(
        addchapter({content,chapterName,course}),
        navigate("/admincourses"),
          window.location.reload()
          
        ); 
     
      };


    const dispatch = useDispatch();
    const [  chapterName, setChapterName] = useState("");
    const [content, setContent] = useState("");
  
    useEffect(() => {
        dispatch(getcourses());
    
      }, []);
      const chapters = useSelector((state) => state.coursesreducer.courses);
      console.log("chap"+chapters)
      const handleChange = (event) => {
        const { options } = event.target;
        let selectedValue = null;
      
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            selectedValue = options[i].value;
            break;
          }
        }
      
        setCourse(selectedValue);
      };
     // console.log("sv"+course)
    return(
    
      <>
      <div className="container">
      <div className='start'>
            <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Add Chapter :</h1>
          </div>
        <div className="start">
    
    <div style={{
              height: "500px",
              width: "600px",
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
            }}>
    <Form>
    <FormGroup row>
      <Label
        for="exampleEmail"
        sm={3}
      >
        Chapter :
      </Label>
      <Col sm={10}>
        <Input
         
          placeholder="chapter name"
          onChange={(e) => setChapterName(e.target.value)}
        />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label
      
        sm={3}
      >
        Content :
      </Label>
      <Col sm={10}>
        <Input
         
          placeholder="content"
          type="text"
          onChange={(e) => setContent(e.target.value)}/>
      </Col>
    </FormGroup>
    course
    <Input type="select" multiple onChange={handleChange} style={{color:"white"}}>
      {chapters.map((option) => (
        <option key={option._id} value={option._id}>
          {option.CourseName}
        </option>
      ))}
    </Input>
    
    
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
      <Button onClick={handleadd} variant="danger">
        Submit
      </Button>
    </Col>
  </FormGroup>
  </Form></div>
  
  </div>
  </div>
  </>
  
  )
  
}
