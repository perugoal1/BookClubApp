import http from './httpService';

const getBookDetails = (id: string) => {
    return http.get(`/user/${id}`);
};

const login = (email: string, password: string) => {
    return http.post('/auth/login', {
        email,
        password,
    });
};

const logout = (email: string, password: string) => {
    return http.post('/auth/logout');
};



const apiService = {
    getBookDetails,
    login,
    logout,
};

export default apiService;
