import axios from '../utils/axios-customize';

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