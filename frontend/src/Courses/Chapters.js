import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { findchapterbyid, getchapters } from '../redux/Action/chapterAction';
import { useParams } from 'react-router-dom';
import { findcoursebyid } from '../redux/Action/coursesAction';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Video from './Video';

export default function Chapters() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);

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

 // console.log("course"+course._id);
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');

  const onEntering = () => setStatus('Opening...');
  const onEntered = () => setStatus('Opened');
  const onExiting = () => setStatus('Closing...');
  const onExited = () => setStatus('Closed');
  const toggle = () => setCollapse(!collapse);
  return (
    <>
      {chapters?.map((el) => (
        <div key={el._id}>

            {course._id==el.course&&
          <div>
          <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
           {el.chapterName}
          </Button>
          <h5>Current state: {status}</h5>
          <Collapse
            isOpen={collapse}
            onEntering={onEntering}
            onEntered={onEntered}
            onExiting={onExiting}
            onExited={onExited}
            
          >
            <Card >
              <CardBody style={{color:'black'}}>
                <Video el ={el}/>
              </CardBody>
            </Card>
          </Collapse>
        </div>}

          
        </div>               
      ))}
    </>
  );
}
