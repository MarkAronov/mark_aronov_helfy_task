

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/tasks',
    timeout: 5000, // 5 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const getTasks = async () => {
    const response = await api.get('/')
    return response.data
}

export const createTask = async (data) => {
    const response = await api.post('/', data)
    return response.data
}

export const updateTask = async (id, data) => {
    const response = await api.put(`/${id}`, data)
    return response.data
}

export const deleteTask = async (id) => {
    await api.delete(`/${id}`)
}

export const patchTask = async (id) => {
    const response = await api.patch(`/${id}/toggle`)
    return response.data
}