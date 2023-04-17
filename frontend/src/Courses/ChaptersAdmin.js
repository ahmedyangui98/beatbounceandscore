import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { findchapterbyid, getchapters, updatechapters } from '../redux/Action/chapterAction';
import { useParams } from 'react-router-dom';
import { findcoursebyid } from '../redux/Action/coursesAction';
import { Collapse, Button, CardBody, Card ,CardTitle,CardSubtitle,Form,Modal,Input} from 'reactstrap';
import Video from './Video';
import { useNavigate } from 'react-router-dom';

export default function ChaptersAdmin() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [coursess, setCoursess] = useState("");
  const [identifiant, setIdentfiant] = useState("");
  const navigate = useNavigate();

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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chapters?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(chapters?.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleEdit = (el) => {
    dispatch(
      updatechapters(el._id, { content, course, chapterName }, navigate),
      window.location.reload()
    );
    //handleClose();
  };

  return (
    <>
      <div className='container'>
        <div className='start'>
          
          {currentItems?.length === 0 ? (
            <Alert>No items to display.</Alert>
          ) : (
            <>
              {currentItems?.map((el) => (
                <div key={el._id}>
                  {course._id === el.course && (
                    <div>
                      <Card style={{ width: '35rem', margin: '0.8rem' }}>
                        <div>
                          <Video el={el} />
                        </div>
                        <CardBody>
                          <CardTitle tag='h5'>
                            Card title
                          </CardTitle>
                          {show ? (
                            <CardSubtitle
                              className='mb-2 text-muted'
                              tag='h6'
                              onClick={() => setShow(true)}
                            >
                              {setChapterName(el.chapterName)}
                            </CardSubtitle>
                          ) : (
                            <Input
                              placeholder={el.chapterName}
                              value={chapterName}
                              onChange={(event) => {
                                setChapterName(event.target.value);
                              }}
                            ></Input>
                          )}
                          {show ? (
                            <CardSubtitle
                              className='mb-2 text-muted'
                              tag='h6'
                              onClick={() => setShow(true)}
                            >
                              {el.content}
                            </CardSubtitle>
                          ) : (
                            <Input
                              placeholder={el.content}
                              value={content}
                              onChange={(event) => {
                                setContent(event.target.value);
                              }}
                            ></Input>
                          )}
                          <Button
                            variant='danger'
                            onClick={() => handleEdit(el)}
                          >
                            Edit
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
              
            </>
          )}
        </div>
        <div className='start'>
        {totalPages > 1 && (
                <div>
                  {currentPage > 1 && (
                    <Button onClick={handlePrevPage}>Prev</Button>
                  )}
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Button onClick={handleNextPage}>Next</Button>
                  )}
                </div>
              )}
        </div>
        
      </div>
    </>
  );
}
