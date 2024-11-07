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

export const callCreateAUser = (fullName, password, email, role) => {
    return axios.post('/api/users', { email, password, fullName, role },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
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

export const callDeleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

// Manager Course
export const callFetchListCourse = (query) => {
    // page=1 & size=3
    return axios.get(`/api/course/page?${query}`);
}

export const callCreateACourse = (courseName, description, courseTarget) => {
    return axios.post('/api/course', { courseName, description, courseTarget },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callDeleteCourse = (id) => {
    return axios.delete(`/api/course/${id}`)
}