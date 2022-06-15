import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
    online: false,
    data: {}
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, online: true, data: action.payload };
        case LOGOUT:
            return { ...state, online: false, data: {} };
        default:
            return state;
    }
};

export default authReducer;
