import { combineReducers } from 'redux';
import authReducer from './auth';
import bookReducer from './books';
import userReducer from './users';

export default combineReducers({
    authReducer,
    bookReducer,
    userReducer,
});
