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

export const callUpdateUser = (id, fullName, role, subscriptionPlan, password) => {
    return axios.put(`/api/users/${id}`, { fullName, role, subscriptionPlan, password },
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

// Dashboard
export const callTotalUser = () => {
    return axios.get(`/api/statistical/active_count`);
}

export const callTotalCourse = () => {
    return axios.get(`/api/statistical/count_course`);
}

export const callTotalTopic = () => {
    return axios.get(`/api/statistical/count_topic`);
}

export const callTotalVocab = () => {
    return axios.get(`/api/statistical/count_vocab`);
}

export const callDataPieChart = () => {
    return axios.get(`/api/statistical/segments`);
}

export const callTotalUserVip = () => {
    return axios.get(`/api/statistical/vip`);
}

export const callPaymentTotal = () => {
    return axios.get(`/api/statistical/revenue`);
}

// Feedback
export const callCreateFeedback = (formType, content) => {
    return axios.post('/api/forms', { formType, content },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

export const callFetchFeedback = (query) => {
    return axios.get(`/api/forms/page?${query}`);
}

export const callDeleteFeedback = (id) => {
    return axios.delete(`/api/forms/${id}`)
}

export const callUpdateFeedback = (id) => {
    return axios.put(`/api/forms/update/${id}`);
}

export const callRejectedFeedback = (id) => {
    return axios.put(`/api/forms/rejected/${id}`);
}

// Client

export const callListCourse = (query) => {
    return axios.get(`/api/course/user?${query}`);
}

export const callListCourseDone = () => {
    return axios.get(`/api/users/course_progress`);
}

export const callListTopic = (query) => {
    return axios.get(`/api/topics/user?${query}`);
}

export const callListTopicDone = () => {
    return axios.get(`/api/users/topic_progress`);
}

// get list vocab learning
export const callListVocab = (query) => {
    return axios.get(`/api/vocabs/user?${query}`);
}

// get list vocab review
export const callListReview = () => {
    return axios.get(`/api/users/review_vocab`);
}

// save vocab to notebook
export const callSaveVocab = (id) => {
    return axios.post('/api/users/selected_vocab', { id });
}

// get all vocab for lever
export const callVocabLever = () => {
    return axios.get('/api/users/review_stats');
}

// get all vocab for notebook
export const callVocabNotebook = (query) => {
    return axios.get(`/api/users/wordbook?${query}`);
}

// save vocab to review
export const callBulkCompleteReview = (data) => {
    return axios.post('/api/users/complete_review', data);
}

// payment

export const callPayment = (amount) => {
    return axios.get(`/api/payment/pay?amount=${amount}`);
}

// change password
export const callChangePassword = (oldPassword, newPassword) => {
    return axios.post('/api/users/change_password', { oldPassword, newPassword },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
}

// Gửi OTP
export const callSendOtp = (email) => {
    return axios.post('/api/users/reset', { email },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
};

// Đổi mật khẩu
export const callResetPassword = (email, password) => {
    return axios.post('/api/users/new_password', { email, password },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
};

// Delete notebook
export const callDeleteNotebook = (id) => {
    return axios.delete(`/api/users/wordbook/${id}`);
}