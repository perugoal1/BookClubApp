import { LOGIN, LOGOUT } from '../actions/types';

import apiService from '../services/apiService';

export const login = (email, password) => async (dispatch) => {
    try {
        const res = await apiService.login(email, password);
        dispatch({ type: LOGIN, payload: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const logout = () => async (dispatch) => {
    try {
        const res = await apiService.logout();
        dispatch({ type: LOGOUT });
        return await Promise.resolve('Logged out');
    } catch (err) {
        return Promise.reject(err);
    }
};
