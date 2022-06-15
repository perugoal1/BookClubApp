import {
    GET_ALL_BOOK,
} from "../actions/types";

const initialState = {
    books: []
};


const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BOOK:
            return { ...state, books: action.books };
        default:
            return state;
    }
};

export default bookReducer;
