import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getcourses } from '../redux/Action/coursesAction';
import CourseCard from './AdminCoursesCard';
import { get_current } from '../redux/Action/authAction';
export default function AdminCourses() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getcourses());
        dispatch(get_current());
      }, []);
     
      const courses = useSelector((state) => state.coursesreducer.courses);
      console.log(courses)
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          {courses?.map((el) => (
            <div key={el._id} style={{margin: "10px"}}>
              <CourseCard el={el} />
            </div>
          ))}
        </div>
      )
}