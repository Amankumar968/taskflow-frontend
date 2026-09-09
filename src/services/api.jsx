import axios from "axios";


const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL

});


API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;

    }

    return config;

});


export const getTasks = () =>
    API.get("/tasks");


export const addTask = (task) =>
    API.post("/tasks", task);


export const deleteTask = (id) =>
    API.delete(`/tasks/${id}`);


export const updateTask = (id, task) =>
    API.put(`/tasks/${id}`, task);


export const searchTasks = (keyword) =>
    API.get(`/tasks/search?keyword=${keyword}`);


export const chatWithAI = (message) => 
    API.post("/api/ai/chat", { 
        prompt: message 
    });