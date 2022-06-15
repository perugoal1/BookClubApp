import {
    LOGIN,
    LOGOUT,
} from "../actions/types";

const initialState = {
    online: false
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, online: true };
        case LOGOUT:
            return { ...state, online: false };
        default:
            return state;
    }
};

export default authReducer;
