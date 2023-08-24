
import {
    FETCH_IMAGES_REQUEST,
    FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_FAILURE,
  } from '../actions/Images';
  
  const initialState = {
    loading: false,
    images: [],
    error: null,
  };
  
  const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_IMAGES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_IMAGES_SUCCESS:
        return {
          ...state,
          loading: false,
          images: action.payload,
        };
      case FETCH_IMAGES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default imagesReducer;
  