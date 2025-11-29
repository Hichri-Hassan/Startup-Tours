// API service for making HTTP requests
import axios from 'axios';

const API_URL = 'https://your-api-url.com/api'; // À remplacer avec votre URL API

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth API
export const authAPI = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },
};

// Users API
export const usersAPI = {
    getProfile: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    },

    updateProfile: async (userId, data) => {
        const response = await api.put(`/users/${userId}`, data);
        return response.data;
    },
};

// Games API
export const gamesAPI = {
    getGames: async () => {
        const response = await api.get('/games');
        return response.data;
    },

    getGameQuestions: async (gameId) => {
        const response = await api.get(`/games/${gameId}/questions`);
        return response.data;
    },

    submitGameResult: async (gameId, score) => {
        const response = await api.post(`/games/${gameId}/results`, { score });
        return response.data;
    },
};

// Matches API
export const matchesAPI = {
    getMatches: async () => {
        const response = await api.get('/matches');
        return response.data;
    },

    createMatch: async (userId1, userId2) => {
        const response = await api.post('/matches', { userId1, userId2 });
        return response.data;
    },
};

// Messages API
export const messagesAPI = {
    getMessages: async (matchId) => {
        const response = await api.get(`/messages/${matchId}`);
        return response.data;
    },

    sendMessage: async (matchId, text) => {
        const response = await api.post('/messages', { matchId, text });
        return response.data;
    },
};

export default api;
