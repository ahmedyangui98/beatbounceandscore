import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOffers, deleteOffer, createOffer } from '../redux/Action/offerAction'
import { Navigate } from 'react-router-dom'
import { OFFER_CREATE_RESET } from '../redux/constants/offerConstants'

const OfferListScreen = ({ match }) => {
    const dispatch = useDispatch()

    const offerslist = useSelector((state) => state.offerslist)
    const { loading, error, offers } = offerslist

    const offreDelete = useSelector((state) => state.offreDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = offreDelete
    
    const offreCreate = useSelector((state) => state.offreCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, offre: createdOffre } = offreCreate


  

    useEffect(() => {
        dispatch({ type: OFFER_CREATE_RESET })
     
        if (successCreate) {
            Navigate(`/admin/offre/edit`)
        }
        else {
            dispatch(listOffers())

        }
    }, [dispatch,  successDelete, successCreate, createdOffre])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {

            dispatch(deleteOffer(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createOffer())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Offers</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create offer
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>location</th>
                            <th>Postname</th>
                            <th>Postdescription</th>
                            <th>Companyname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer) => (
                            <tr key={offer._id}>
                                <td>{offer._id}</td>
                                <td>{offer.location}</td>
                                <td>
                                    {offer.Postname}
                                </td>
                                <td>
                                    {offer.Postdescription}
                                </td>
                                <td>
                                    {offer.Companyname}
                                </td>

                                <td>
                                    <LinkContainer to={`/admin/offer/${offer._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(offer._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OfferListScreen