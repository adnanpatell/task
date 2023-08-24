import { createStore, applyMiddleware, combineReducers } from 'redux';
import imagesReducer from '../reducers/Images'; // Import your imagesReducer
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  images: imagesReducer, // Add your imagesReducer to the root reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;