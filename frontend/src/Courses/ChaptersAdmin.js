import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { findchapterbyid, getchapters, updatechapters } from '../redux/Action/chapterAction';
import { useParams } from 'react-router-dom';
import { findcoursebyid } from '../redux/Action/coursesAction';
import { Collapse, Button, CardBody, Card ,CardTitle,CardSubtitle,Form,Modal,Input} from 'reactstrap';
import Video from './Video';
import { Navigate } from 'react-router-dom';
export default function ChaptersAdmin() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [coursess, setCoursess] = useState("");
  const [identifiant, setIdentfiant] = useState("");

  useEffect(() => {
    dispatch(getchapters());
  }, [dispatch]);

  useEffect(() => {
    if (id && !fetched) {
      dispatch(findcoursebyid(id));
      setFetched(true);
    }
  }, [dispatch, id, fetched]);

  const chapters = useSelector((state) => state.chaptersreducer?.chapters);
  const course = useSelector((state) => state.coursesreducer?.fc);

  console.log("course"+course._id);

  const courses = useSelector((state) => state.coursesreducer.courses);
  console.log("chap"+chapters)
  /*const handleEdit = async (e) => {
    e.preventDefault();
   

   dispatch(
      updateusers(el._id, {firstname,lastname,email,password,image,role,gender,birthdate},Navigate),  
      window.location.reload()
      
    ); handleClose()
 
  };
 */
  return (
    <>
     {chapters?.map((el) => (
  <div key={el._id} style={{width:"200px"}}>
    {course._id===el.course && (
      <div>
        <Card style={{ width: '35rem' }}>
          <div>
            <Video el={el} />
          </div>
          <CardBody>
            <CardTitle tag="h5">
              Card title
            </CardTitle>{show? <CardSubtitle className="mb-2 text-muted" tag="h6" onClick={setShow(true)}>
              {el.chapterName}
            </CardSubtitle>:<Input placeholder={el.chapterName} onChange={(event) => {
                        setChapterName(event.target.value)
                      }}></Input>}
            {show? <CardSubtitle className="mb-2 text-muted" tag="h6" onClick={setShow(true)}>
              {el.content}
            </CardSubtitle>:<Input placeholder={el.content}   onChange={(event) => {
                        setContent(event.target.value)
                      }}
                    ></Input>}
            <Button variant="danger" onClick={() =>  dispatch(
      updatechapters(el._id, {content,course,chapterName},Navigate),  
      window.location.reload()
      
    )}>
              Edit
            </Button>
          </CardBody>
        </Card>
        
          
      </div>
    )}
  </div>
))}

    </>
  );
}
