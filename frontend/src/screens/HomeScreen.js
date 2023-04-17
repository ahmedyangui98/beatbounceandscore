import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Offer from '../components/Offer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOffers } from '../redux/Action/offerAction'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const offerslist = useSelector(state => state.offerslist)

  const { loading, error, offers } = offerslist

  useEffect(() => {
    dispatch(listOffers())

  }, [dispatch])


  return (

    <>
      <h1 >Latest Offers</h1>
      {loading ? (
        <h2>loading .. </h2>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {offers?.map((offer) => (
            <Col key={offer?._id} sm={12} md={6} lg={4} xl={3}>
              <Offer offer={offer} />
            </Col>

          ))}
        </Row>
      )}
    </>

  )

}

export default HomeScreen
