import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Offer from '../components/Offer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOffers } from '../redux/Action/offerAction'
import "../assets/css/jobs.css";
import { Route, Routes,useParams } from "react-router-dom";
import SearchBox from '../components/SearchBox'
const HomeScreen = () => {
  const {keyword} = useParams()
  const dispatch = useDispatch()
  const offerslist = useSelector(state => state.offerslist)

  const { loading, error, offers } = offerslist

  useEffect(() => {
    dispatch(listOffers(keyword))

  }, [dispatch,keyword])

 
  return (

    <>

<div className='container'>
      <div className='start'> 
   
      <h1 >Latest Offers</h1>
      </div>
   
  
        <SearchBox />
  
  

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
      
      </div>
    </>

  )

}

export default HomeScreen
