import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listOfferDetails, updateOffer } from '../redux/Action/offerAction'
import { OFFER_UPDATE_RESET } from '../redux/constants/offerConstants'
import "../assets/css/jobs.css";


const OfferEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate('');
    const [Postdescription, setPostDescription] = useState('')
    const [image, setImage] = useState('')
    const [location, setLocation] = useState('')
    const [Postname, setPostName] = useState('')
    const [Companyname, setCompanyName] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const offerDetails = useSelector((state) => state.offerDetails)
    const { loading, error, offer } = offerDetails

    const offerUpdate = useSelector((state) => state.offerUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = offerUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: OFFER_UPDATE_RESET })
            Navigate('/admin/offerlist')
        }
        else {
            if (offer._id !== id) {
                dispatch(listOfferDetails(id))
                console.log(id)
            } else {
                console.log(offer)

                setPostDescription(offer.Postdescription)
                setImage(offer.image)
                setLocation(offer.location)
                setPostName(offer.Postname)
                setCompanyName(offer.Companyname)

                setDescription(offer.description)
            }



        }
    }, [dispatch, id, offer, successUpdate])

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try { 
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const { data } = await axios.post('http://localhost:4000/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateOffer(id, {
                _id: id,
                Postdescription,
                location,
                Postname,
                Companyname,
                image,
              
            }, navigate)
        )
    }
    return (
        <>
          
            <FormContainer>
                <h1>Edit Offer</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId='Postdescription' >
                            <Form.Label>Postdescription</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Postdescription'
                                defaultValue={offer.Postdescription}
                                onChange={(e) => setPostDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                defaultValue={offer.image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control type="file" onChange={uploadFileHandler} 
   />

                        </Form.Group>
                        

                        {uploading && <Loader />}
                        <Form.Group controlId='location'>
                            <Form.Label>location</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter location'
                                defaultValue={offer.location}

                                onChange={(e) => setLocation(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='Postname'>
                            <Form.Label>Postname </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Postname'
                                defaultValue={offer.Postname}

                                onChange={(e) => setPostName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='Companyname'>
                            <Form.Label>Companyname </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Companyname'
                                defaultValue={offer.Companyname}

                                onChange={(e) => setCompanyName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                  

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

<Link to='/admin/offerlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            </FormContainer>
        </>
    )
}

export default OfferEditScreen