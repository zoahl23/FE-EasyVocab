import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    //withCredentials: true, // gửi kèm cookie
});

// gửi kèm token với mọi request
// instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
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

        const allowedPaths = ['/review', '/learn', '/notebook', '/events'];

        if (!allowedPaths.includes(window.location.pathname)
            && !window.location.pathname.startsWith('/learn')
            && !window.location.pathname.startsWith('/api')
        ) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
    }

    return error?.response?.data ?? Promise.reject(error);
});

export default instance;