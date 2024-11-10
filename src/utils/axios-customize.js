import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    //withCredentials: true, // gửi kèm cookie
});

// gửi kèm token với mọi request
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// const NO_RETRY_HEADER = 'x-no-retry'

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data && response.data.data ? response.data : response;
}, function (error) { // async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.config && error.response
        && +error.response.status === 401) {
        // Xóa token khỏi localStorage
        localStorage.removeItem('access_token');

        const allowedPaths = ['/', '/learn', '/notebook', '/events'];
        // Kiểm tra nếu người dùng không ở trang chủ, thì chuyển hướng về trang login
        if (!allowedPaths.includes(window.location.pathname)) {
            window.location.href = '/login';
        }
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance;