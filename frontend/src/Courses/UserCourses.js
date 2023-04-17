import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getcourses } from '../redux/Action/coursesAction';
import CourseCard from './UserCourseCard';
export default function UserCourses() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getcourses());
    
      }, []);
      const courses = useSelector((state) => state.coursesreducer.courses);
  return (

    <>
      <div className="container">
      <div className='start'>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>  {courses?.map((el) => (
        <div key={el._id}>
          <CourseCard el={el} />
        </div>
      ))}</div>
  </div>
  </div>
  </>

  )
}
