
import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function UserCourseCard({ el }) {
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <MDBCard style={{ width: '400px' ,marginRight:"20px"}}>
          <MDBCardImage position='top' alt='...' src={`https://firebasestorage.googleapis.com/v0/b/beatbounceandscore.appspot.com/o/${el.image}?alt=media&token=894834e1-f47f-4826-b6dc-8801bcae91aa`} />
          <MDBCardBody>
            <MDBCardTitle>{el.CourseName}</MDBCardTitle>
            <MDBCardText>
              {el.CourseName}
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>CourseName:{el.CourseName}</MDBListGroupItem>
            <MDBListGroupItem>Progression: {el.progression}%</MDBListGroupItem>
            <MDBListGroupItem>Type : {el.type}</MDBListGroupItem>
            <MDBListGroupItem>level : {el.level}</MDBListGroupItem>
            <MDBListGroupItem>expirationDate : {el.expirationDate}</MDBListGroupItem>
          </MDBListGroup>
          <MDBCardBody>
          {Date.now() < new Date(el.expirationDate).getTime() && (
  <MDBCardLink href={`/chapters/${el._id}`} disabled>join courses</MDBCardLink>
)}            <MDBCardLink href='#'>More details</MDBCardLink>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
