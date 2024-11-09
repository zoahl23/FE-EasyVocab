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

export const callCreateAUser = (fullName, password, email, role, subscriptionPlan) => {
    return axios.post('/api/users', { email, password, fullName, role, subscriptionPlan },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callUpdateUser = (id, fullName, role, subscriptionPlan) => {
    return axios.put(`/api/users/${id}`, { fullName, role, subscriptionPlan },
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

export const callBulkCreateUser = (data) => {
    return axios.post('/api/users/list', data)
}

export const callDeleteSub = (id) => {
    return axios.delete(`/api/users/sub/${id}`)
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

export const callUpdateCourse = (id, courseName, description, courseTarget) => {
    return axios.put(`/api/course/${id}`, { courseName, description, courseTarget },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callBulkCreateCourse = (data) => {
    return axios.post('/api/course/list', data)
}

// Manager Topic
export const callFetchListTopic = (query) => {
    return axios.get(`/api/topics/page?${query}`);
}

export const callFetchAllCourse = () => {
    return axios.get('/api/course');
}

export const callFetchAllTopic = () => {
    return axios.get('/api/topics');
}

export const callCreateATopic = (topicName, description, courseId) => {
    return axios.post('/api/topics', { topicName, description, courseId },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callUploadTopicImg = (id, fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', fileImg);
    return axios({
        method: 'post',
        url: `/api/topics/image/${id}`,
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
}

export const callBulkCreateTopic = (data) => {
    return axios.post('/api/topics/list', data)
}

export const callDeleteTopic = (id) => {
    return axios.delete(`/api/topics/${id}`)
}

export const callDeleteTopicImg = (id) => {
    return axios.delete(`/api/topics/image/${id}`)
}

export const callUpdateTopic = (id, topicName, description, courseId) => {
    return axios.put(`/api/topics/${id}`, { topicName, description, courseId },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

// Vocabulary
export const callFetchListVocab = (query) => {
    return axios.get(`/api/vocabs/page?${query}`);
}

export const callCreateAVocab = (word, meaning, topicId) => {
    return axios.post('/api/vocabs', { word, meaning, topicId },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}

export const callBulkCreateVocab = (data) => {
    return axios.post('/api/vocabs/list', data)
}

export const callDeleteVocab = (id) => {
    return axios.delete(`/api/vocabs/${id}`)
}

export const callUpdateVocab = (id, word, meaning, topicId) => {
    return axios.put(`/api/vocabs/${id}`, { word, meaning, topicId },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}