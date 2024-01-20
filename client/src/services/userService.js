import axiosInstance from './axiosInstance';

const userService = {
    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/login', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    sendResetEmail: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/send-reset-email', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    resetPassword: async (uniqueId, payload) => {
        try {
            const response = await axiosInstance.put(`/users/reset-password/${uniqueId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    registerUser: async (payload) => {
        try {
            const response = await axiosInstance.post('/users/register', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUserInfo: async () => {
        try {
            const response = await axiosInstance.get('/users/get-user-info');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (payload) => {
        try {
            const response = await axiosInstance.put('/users/update-user-info', payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default userService;