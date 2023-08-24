// actions/images.js

import axios from 'axios';

// Action Types
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

// Action Creators
export const fetchImagesRequest = () => ({
  type: FETCH_IMAGES_REQUEST,
});

export const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: images,
});

export const fetchImagesFailure = (error) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Images
export const fetchImages = () => {
  return async (dispatch) => {
    dispatch(fetchImagesRequest());

    try {
        const res = await axios.get('https://api.cloudinary.com/v1_1/dhh8atda3/resources/image', {
            headers: {
              Authorization: `541919539486426`, // Replace with your Cloudinary API key
            },
          });
      const images = res.data.resources;
      dispatch(fetchImagesSuccess(images));
    } catch (error) {
      dispatch(fetchImagesFailure(error));
    }
  };
};
