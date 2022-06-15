import {
    LOGIN,
    LOGOUT,
} from "../actions/types";

import apiService from '../services/apiService';

export const login = (email, password) =>
    async (dispatch) => {
        try {
            const res = await apiService.login(email, password);
            console.log(666666, res);
            dispatch({ type: LOGIN });
            return await Promise.resolve(res.data);
        } catch (err) {
            return Promise.reject(err);
        }
    };
