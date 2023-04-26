import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const Offer = ({ offer }) => {
  return (
    
    <Card className='my-3 p-3 rounded'>
      <Link to={`/offer/${offer._id}`}>
        <Card.Img src={offer.image} variant='top' />
        <strong>{offer.Companyname}</strong>
      </Link>
      <Card.Body>
        <Link to={`/offer/${offer._id}`}>
          <Card.Title as='div'>
            <strong>{offer.Postname}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={offer.rating}
            text={`${offer.numReviews}reviews`}

          />

        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Offer
