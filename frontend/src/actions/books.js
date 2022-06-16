import {
    GET_ALL_BOOK,
    GET_BOOK,
    CREATE_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    BORROW_BOOK,
    RETURN_BOOK,
    ANALYTICS_GENRE,
    ANALYTICS_PUBLISHED_YEAR,
} from './types';

import apiService from '../services/apiService';

export const getBookDetails = (id) => async (dispatch) => {
    try {
        const res = await apiService.getBookDetails(id);
        dispatch({ type: GET_BOOK, book: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAllBookDetails = (text) => async (dispatch) => {
    try {
        const res = await apiService.getAllBookDetails(text);
        dispatch({ type: GET_ALL_BOOK, books: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const createBook = (data) => async (dispatch) => {
    try {
        const res = await apiService.createBook(data);
        dispatch({ type: CREATE_BOOK, book: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateBook = (id, data) => async (dispatch) => {
    try {
        const res = await apiService.updateBook(id, data);
        dispatch({ type: UPDATE_BOOK, book: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteBook = (id) => async (dispatch) => {
    try {
        const res = await apiService.deleteBook(id);
        dispatch({ type: DELETE_BOOK });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const borrowBook = (id) => async (dispatch) => {
    try {
        const res = await apiService.borrowBook(id);
        dispatch({ type: BORROW_BOOK });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const returnBook = (id) => async (dispatch) => {
    try {
        const res = await apiService.returnBook(id);
        dispatch({ type: RETURN_BOOK });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getGenreAnalytics = () => async (dispatch) => {
    try {
        const res = await apiService.getGenreAnalytics();
        dispatch({ type: ANALYTICS_GENRE, genreAnalytics: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getPublishedYearAnalytics = () => async (dispatch) => {
    try {
        const res = await apiService.getPublishedYearAnalytics();
        dispatch({
            type: ANALYTICS_PUBLISHED_YEAR,
            publishedYearAnalytics: res.data,
        });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
