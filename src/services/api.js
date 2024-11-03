import axios from '../utils/axios-customize';

const callRegister = (fullName, email, password) => {
    return axios.post('/api/users/register', { email, password, fullName }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export { callRegister }