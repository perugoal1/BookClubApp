import {
    GET_USER,
    GET_ALL_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_APPROVAL_LIST,
    GET_APPROVAL_DETAILS,
    APPROVE_USER,
} from '../actions/types';

const initialState = {
    user: {},
    users: [],
    approvalList: [],
    approvalDetails: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, user: action.user };
        case GET_ALL_USER:
            return { ...state, users: action.users };
        case GET_APPROVAL_LIST:
            return { ...state, approvalList: action.approvalList };
        case GET_APPROVAL_DETAILS:
            return { ...state, approvalDetails: action.approvalDetails };
        case APPROVE_USER:
            return { ...state };
        case CREATE_USER:
            return { ...state, user: action.user };
        case UPDATE_USER:
            return { ...state, user: action.user };
        case DELETE_USER:
            return { ...state, user: {} };
        default:
            return state;
    }
};

export default userReducer;
