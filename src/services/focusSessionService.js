import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const startFocusSession = (taskId, duration) =>
    API.post("/focus-sessions/start", { taskId, duration });


export const completeFocusSession = (id) =>
    API.put(`/focus-sessions/${id}/complete`);

export const cancelFocusSession = (id) =>
    API.put(`/focus-sessions/${id}/cancel`);


export const getFocusSessions = () =>
    API.get("/focus-sessions");


export const getTodaySessions = () =>
    API.get("/focus-sessions/today");

export const getTaskSessions = (taskId) =>
    API.get(`/focus-sessions/task/${taskId}`);


export const deleteFocusSession = (id) =>
    API.delete(`/focus-sessions/${id}`);


export const getDashboard = () =>
    API.get("/dashboard");