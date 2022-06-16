import http from './httpService';

const login = (email: string, password: string) => {
    return http.post('/auth/login', {
        email,
        password,
    });
};

const logout = () => {
    return http.post('/auth/logout');
};

const getAllBookDetails = (text: string) => {
    const params: any = {};
    if (text) params.searchText = text;
    return http.post(`/book/getAllBooks`, params);
};

const getBookDetails = (id: string) => {
    return http.get(`/book/${id}`);
};

const createBook = (data: any) => {
    return http.post(`/book/create`, data);
};

const updateBook = (id: string, data: any) => {
    return http.post(`/book/${id}/update`, data);
};

const deleteBook = (id: string) => {
    return http.delete(`/book/${id}/delete`);
};

const borrowBook = (id: string) => {
    return http.post(`/book/${id}/borrow`);
};

const returnBook = (id: string) => {
    return http.post(`/book/${id}/return`);
};

const getAllUsers = (text: string) => {
    const params: any = {};
    if (text) params.searchText = text;
    return http.post(`/user/getAllUsers`, params);
};

const getApprovalList = () => {
    return http.post(`/user/getApprovalList`);
};

const getApprovalDetails = (id: string) => {
    return http.get(`/user/getApprovalDetails/${id}`);
};

const approveUser = (id: string) => {
    return http.post(`/user/${id}/approveUser`);
};

const getUserDetails = (id: string) => {
    return http.get(`/user/${id}`);
};

const createUser = (data: any) => {
    return http.post(`/user/create`, data);
};

const updateUser = (id: string, data: any) => {
    return http.post(`/user/${id}/update`, data);
};

const deleteUser = (id: string) => {
    return http.delete(`/user/${id}/delete`);
};

const apiService = {
    getBookDetails,
    getAllBookDetails,
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    login,
    logout,
    getApprovalList,
    getApprovalDetails,
    approveUser,
    getAllUsers,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser,
};

export default apiService;
