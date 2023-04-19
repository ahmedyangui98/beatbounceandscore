import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { listOfferDetails,createOfferReview } from '../redux/Action/offerAction'
import Offer from '../components/Offer'
import { OFFER_CREATE_REVIEW_RESET } from '../redux/constants/offerConstants'

const OfferDetailsScreen = ({ history }) => {

  const dispatch = useDispatch()
  const { id } = useParams();


  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const offerDetails = useSelector(state => state.offerDetails)

  const { loading, error, offer } = offerDetails

  const offerReviewCreate = useSelector((state) => state.offerReviewCreate)
  const {
    success: successOfferReview,
    loading: loadingOfferReview,
    error: errorOfferReview,
  } = offerReviewCreate



  useEffect(() => {
    if(successOfferReview) {
      alert('Review Submitted !')
      setRating(0)
      setComment('')
      dispatch({type: OFFER_CREATE_REVIEW_RESET})
    }
    dispatch(listOfferDetails(id))

  }, [dispatch, id,successOfferReview])

  const navigate = useNavigate();

  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createOfferReview(id, {
        rating,
        comment,
      })
    )
  }

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
 <Row>

          <Col>
          <h2>Reviews</h2>
              {offer.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {offer.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>  
                  ))}
                   <ListGroup.Item>
                  <h2>Write an Offer Review</h2>
                  {successOfferReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingOfferReview && <Loader />}
                  {errorOfferReview && (
                    <Message variant='danger'>{errorOfferReview}</Message>
                  )}
                  {
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 -Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingOfferReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                   }
                </ListGroup.Item>
                   </ListGroup>
          </Col>
        
        </Row>
    </>

    


  )
}

export default OfferDetailsScreen
