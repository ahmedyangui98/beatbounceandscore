import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { listOfferDetails } from '../redux/Action/offerAction'
import Offer from '../components/Offer'

const OfferDetailsScreen = ({ history }) => {

  const dispatch = useDispatch()
  const { id } = useParams();

  const offerDetails = useSelector(state => state.offerDetails)

  const { loading, error, offer } = offerDetails


  useEffect(() => {
    dispatch(listOfferDetails(id))

  }, [dispatch, id])

  const navigate = useNavigate();

  

  return (
    <>
    
   
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

        <Row>
          <Col md={6}>
            <Image src={offer.image} alt={offer.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{offer.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={offer.rating} text={`${offer.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Location :{offer.location}
              </ListGroup.Item>
              <ListGroup.Item>
              Postdescription :{offer.Postdescription}
              </ListGroup.Item>
              <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Companyname:
                    </Col>
                    <Col>
                      <strong>{offer.Companyname}</strong>
                    </Col>
                    <Col>PostName :</Col>
                    <Col>
                      <strong>{offer.Postname}</strong>
                    </Col>
                  </Row>
                  
                </ListGroup.Item>
              
              </ListGroup>
            </Card>
            </ListGroup>
            <Link className='btn btn-light my-3' to='/home'>
            go back
             </Link>
          </Col>
          <Col md={3}>
          
          </Col>
        </Row>
      )}

    </>


  )
}

export default OfferDetailsScreen
