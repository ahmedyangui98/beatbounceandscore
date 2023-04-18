import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getcourses } from '../redux/Action/coursesAction';
import CourseCard from './AdminCoursesCard';
import { get_current } from '../redux/Action/authAction';
import { Pagination } from 'react-bootstrap';

export default function AdminCourses() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    dispatch(getcourses());
    dispatch(get_current());
  }, []);

  const courses = useSelector((state) => state.coursesreducer.courses);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(courses?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className='start'>
        <h1 style={{fontSize:55,color:'black', fontWeight: 'bold' }}>Courses Management :</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {currentItems?.map((el) => (
          <div key={el._id} style={{margin: "10px"}}>
            <CourseCard el={el} />
          </div>
        ))}
      </div>
      <div className='start'>
        {courses && (
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= courses.length}
            />
          </Pagination>
        )}
      </div>
    </div>
  );
}
