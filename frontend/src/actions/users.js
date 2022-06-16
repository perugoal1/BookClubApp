import {
    GET_USER,
    GET_ALL_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    GET_APPROVAL_LIST,
    GET_APPROVAL_DETAILS,
    APPROVE_USER,
} from './types';
import apiService from '../services/apiService';

export const getUserDetails = (id) => async (dispatch) => {
    try {
        const res = await apiService.getUserDetails(id);
        dispatch({ type: GET_USER, user: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getApprovalList = () => async (dispatch) => {
    try {
        const res = await apiService.getApprovalList();
        dispatch({ type: GET_APPROVAL_LIST, approvalList: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const approveUser = (id) => async (dispatch) => {
    try {
        const res = await apiService.approveUser(id);
        dispatch({ type: APPROVE_USER });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getApprovalDetails = (id) => async (dispatch) => {
    try {
        const res = await apiService.getApprovalDetails(id);
        dispatch({ type: GET_APPROVAL_DETAILS, approvalDetails: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAllUsers = (text) => async (dispatch) => {
    try {
        const res = await apiService.getAllUsers(text);
        dispatch({ type: GET_ALL_USER, users: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const createUser = (data) => async (dispatch) => {
    try {
        const newData = { ...data };
        delete newData._id;
        const res = await apiService.createUser(newData);
        dispatch({ type: CREATE_USER, user: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const res = await apiService.updateUser(id, data);
        dispatch({ type: UPDATE_USER, user: res.data });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await apiService.deleteUser(id);
        dispatch({ type: DELETE_USER });
        return await Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
