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
      console.log("sv"+course)
    return(<div style={{height:"300px",width:"500px",color:"white"}}><Form>
    <FormGroup row>
      <Label
        for="exampleEmail"
        sm={2}
      >
        Chapter
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
      
        sm={2}
      >
        Content
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
  </Form></div>)
  
}
