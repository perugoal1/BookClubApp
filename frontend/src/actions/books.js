import {
    GET_BOOK,
    GET_ALL_BOOK
  } from "./types";

import apiService from '../services/apiService';

export const getBookDetails = (id) =>
    async (dispatch) => {
        try {
            const res = await apiService.getBookDetails(id);
            dispatch({ type: GET_ALL_BOOK, books: data });
            return await Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };
