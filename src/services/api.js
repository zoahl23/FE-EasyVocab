import axios from '../utils/axios-customize';

// AUTH
export const callRegister = (fullName, email, password) => {
    return axios.post('/api/users/register', { email, password, fullName },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callLogin = (email, password) => {
    return axios.post('/api/users/login', { email, password },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callFetchAccount = () => {
    return axios.get('/api/users/account')
}

export const callLogout = () => {
    return axios.post('/api/users/logout')
}

// Manager User
export const callFetchListUser = (query) => {
    // page=1 & size=3
    return axios.get(`/api/users/page?${query}`);
}

export const callUpdateUser = (id, fullName, role, paid) => {
    return axios.put(`/api/users/${id}`, { fullName, role, paid },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}