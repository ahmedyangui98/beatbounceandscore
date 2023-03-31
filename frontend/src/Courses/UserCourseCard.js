
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
          <MDBCardImage position='top' alt='...' src='https://cpformation.com/wp-content/uploads/2020/03/visuel-evaluation-formation.jpg' />
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
            <MDBCardLink href={`/chapters/${el._id}`}>join courses</MDBCardLink>
            <MDBCardLink href='#'>More details</MDBCardLink>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
