import { 
    OFFER_LIST_REQUEST,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL,
    OFFER_DETAILS_REQUEST,
    OFFER_DETAILS_SUCCESS,
    OFFER_DETAILS_FAIL,
    OFFER_DELETE_REQUEST,
    OFFER_DELETE_SUCCESS,
    OFFER_DELETE_FAIL,
    OFFER_CREATE_REQUEST,
    OFFER_CREATE_SUCCESS,
    OFFER_CREATE_FAIL,
    OFFER_UPDATE_REQUEST,
    OFFER_UPDATE_SUCCESS,
    OFFER_UPDATE_FAIL,
    OFFER_CREATE_REVIEW_REQUEST,
    OFFER_CREATE_REVIEW_SUCCESS,
    OFFER_CREATE_REVIEW_FAIL,   
    } from '../constants/offerConstants'
    import axios from 'axios'

    export const listOffers = (keyword = '') => async(dispatch) => {
 
        try {
            dispatch({ type: OFFER_LIST_REQUEST })
        
            const { data } = await  axios.get(`https://beat-bounce-and-score-server.onrender.com/api/offers/allOffers?keyword=${keyword}`)
       // console.log(data)
            dispatch({
               type: OFFER_LIST_SUCCESS,
               payload: data,
            })
           // console.log(data)

        } catch (error) { 
            dispatch({
                type: OFFER_LIST_FAIL,
                payload: error.response && error.response.data.message  
                ? error.response.data.message
                :error.message,
        
            })
        
        }
        }

        export const listOfferDetails = (id) => async(dispatch) => {
 
            try {
                dispatch({ type: OFFER_DETAILS_REQUEST })
            
                const { data } = await  axios.get(`https://beat-bounce-and-score-server.onrender.com/api/offers/getById/${id}`)
            
                dispatch({
                   type: OFFER_DETAILS_SUCCESS,
                   payload: data,
                })
            
            } catch (error) { 
                dispatch({
                    type: OFFER_DETAILS_FAIL,
                    payload: error.response && error.response.data.message  
                    ? error.response.data.message
                    :error.message,
            
                })
            
            }
            }     

            export const deleteOffer = (id) => async (dispatch, getState) => {
                try {
                  dispatch({
                    type: OFFER_DELETE_REQUEST,
                  })
              
                  const {
                  //  userLogin: { userInfo },
                  } = getState()
              
                  const config = {
                    headers: {
                     // Authorization: `Bearer ${userInfo.token}`,
                    },
                  }
              
                  await axios.delete(`https://beat-bounce-and-score-server.onrender.com/api/offers/delete/${id}`, config)
              
                  dispatch({
                    type: OFFER_DELETE_SUCCESS,
                  })
                } catch (error) {
                  const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message/*
                  if (message === 'Not authorized, token failed') {
                    dispatch(logout())
                  }*/
                  dispatch({
                    type: OFFER_DELETE_FAIL,
                    payload: message,
                  })
                }
              }       

              export const createOffer = () => async (dispatch, getState) => {
                try {
                  dispatch({
                    type: OFFER_CREATE_REQUEST,
                  })
              
                  const {
                    userLogin: { userInfo },
                  } = getState()
              
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userInfo.token}`,
                    },
                  }
              
                  const { data } = await axios.post(`https://beat-bounce-and-score-server.onrender.com/api/offers/create`, {}, config)
              
                  dispatch({
                    type: OFFER_CREATE_SUCCESS,
                    payload: data,
                  })
                } catch (error) {
                  const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                 /* if (message === 'Not authorized, token failed') {
                    dispatch(logout())
                  }*/
                  dispatch({
                    type: OFFER_CREATE_FAIL,
                    payload: message,
                  })
                }
              }    

              export const updateOffer = (id, offerData,navigate) => async (dispatch, getState) => {
                try {
                  dispatch({ type: OFFER_UPDATE_REQUEST })
              
                  //const { userLogin: { userInfo } } = getState()
              
                  const config = {
                    headers: {
                      'Content-Type': 'application/json',
                     // Authorization: `Bearer ${userInfo.token}`
                    }
                  }
              
                  const { data } = await axios.put(`https://beat-bounce-and-score-server.onrender.com/api/offers/updateOffer/${id}`, offerData,config)
             // console.log(data)
                  dispatch({ type: OFFER_UPDATE_SUCCESS, payload: data })
                  navigate("/admin/offerlist");
                  window.location.reload()
              
                } catch (error) {
                  dispatch({
                    type: OFFER_UPDATE_FAIL,
                    payload: error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
                  })
                }
              
               // console.log("id:"+id)
               
               //console.log("offerData:"+offerData)
              }
                         
              export const createOfferReview = (offerId, review) => async (
                dispatch,
                getState
              ) => {
                try {
                  dispatch({
                    type: OFFER_CREATE_REVIEW_REQUEST,
                  })
              
                  const {
                  } = getState()
              
                  const config = {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
              
                  await axios.post(`https://beat-bounce-and-score-server.onrender.com/api/offers/${offerId}/reviews`, review, config)
              
                  dispatch({
                    type: OFFER_CREATE_REVIEW_SUCCESS,
                  })
                } catch (error) {
                  const message =
                    error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                  if (message === 'Not authorized, token failed') {
                    //dispatch(logout())
                  }
                  dispatch({
                    type: OFFER_CREATE_REVIEW_FAIL,
                    payload: message,
                  })
                }
              }
                    
                               