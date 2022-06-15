import { combineReducers } from 'redux';
import authReducer from './auth';
import bookReducer from './books';

export default combineReducers({
    authReducer,
    bookReducer,
});
