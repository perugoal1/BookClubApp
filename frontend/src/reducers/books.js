import {
    GET_ALL_BOOK,
    GET_BOOK,
    CREATE_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    BORROW_BOOK,
    RETURN_BOOK,
} from '../actions/types';

const initialState = {
    books: [],
    book: {},
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOK:
            return { ...state, book: action.book };
        case GET_ALL_BOOK:
            return { ...state, books: action.books };
        case CREATE_BOOK:
            return { ...state, book: action.book };
        case UPDATE_BOOK:
            return { ...state, book: action.book };
        case DELETE_BOOK:
            return { ...state, book: {} };
        case BORROW_BOOK:
            return { ...state };
        case RETURN_BOOK:
            return { ...state };
        default:
            return state;
    }
};

export default bookReducer;
