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
    OFFER_CREATE_RESET,
    OFFER_UPDATE_REQUEST,
    OFFER_UPDATE_SUCCESS,
    OFFER_UPDATE_FAIL,
    OFFER_UPDATE_RESET,
    OFFER_CREATE_REVIEW_REQUEST,
    OFFER_CREATE_REVIEW_SUCCESS,
    OFFER_CREATE_REVIEW_FAIL,
    OFFER_CREATE_REVIEW_RESET,


} from '../constants/offerConstants'

export const offerListReducer = (state = { offers: [] }, action) => {

    switch (action.type) {
        case OFFER_LIST_REQUEST:
            return { loading: true, offers: [] }
        case OFFER_LIST_SUCCESS:
            return { loading: false, offers: action.payload }
        case OFFER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}
export const offerDetailsReducer = (
    state = { offer: { reviews: [] } },
    action
) => {

    switch (action.type) {
        case OFFER_DETAILS_REQUEST:
            return { loading: true, ...state }
        case OFFER_DETAILS_SUCCESS:
            return { loading: false, offer: action.payload }
        case OFFER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }


}
export const offerDeleteReducer = (
    state = {},
    action
) => {

    switch (action.type) {
        case OFFER_DELETE_REQUEST:
            return { loading: true}
        case OFFER_DELETE_SUCCESS:
            return { loading: false, success: true}
        case OFFER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }


}
export const offerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_CREATE_REQUEST:
        return { loading: true }
      case OFFER_CREATE_SUCCESS:
        return { loading: false, success: true, offer: action.payload }
      case OFFER_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case OFFER_CREATE_RESET:
        return {}
      default:
        return state
    }
  }

  export const offerUpdateReducer = (state = { offer: {} }, action) => {
    switch (action.type) {
      case OFFER_UPDATE_REQUEST:
        return { loading: true }
      case OFFER_UPDATE_SUCCESS:
        return { loading: false, success: true, offer: action.payload }
      case OFFER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case OFFER_UPDATE_RESET:
        return { offer: {} }
      default:
        return state
    }
  }


  export const offerReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case OFFER_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case OFFER_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case OFFER_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }   
  