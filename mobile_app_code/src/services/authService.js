import axios from 'axios';

// Replace with your local IP address for Android Emulator authentication
// Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) to find it. e.g. 192.168.1.5
const API_URL = 'http://10.0.2.2:8080/api/public/auth';

const authService = {
    forgotPassword: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    verifyResetCode: async (email, code) => {
        try {
            const response = await axios.post(`${API_URL}/verify-reset-code`, { email, code });
            return response.data; // Expecting { resetSession: "..." }
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    resetPassword: async (resetSession, newPassword) => {
        try {
            const response = await axios.post(`${API_URL}/reset-password`, { resetSession, newPassword });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    }
};

export default authService;
