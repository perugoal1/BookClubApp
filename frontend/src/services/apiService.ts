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

const apiService = {
    getBookDetails,
    getAllBookDetails,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    login,
    logout,
};

export default apiService;
