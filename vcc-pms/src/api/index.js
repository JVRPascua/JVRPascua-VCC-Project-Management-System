import axios from "axios";

let development = process.env.NODE_ENV !== 'production'
const API = axios.create({ baseURL:  development ? 'http://localhost:5000' : 'https://vcc-project-management-system.herokuapp.com'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchProject = (id) => API.get(`/projects/${id}`);
export const fetchProjects = (page, userId) => API.get(`/projects?page=${page}&userId=${userId}`);
export const fetchProjectsBySearch = (searchQuery) => API.get(`/projects/search?searchQuery=${searchQuery.search || 'none'}`);
export const createProject = (newProject) => API.post('/projects', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const fetchProjectTasks = (id) => API.get(`/tasks/${id}`);
export const fetchTask = (id) => API.get(`/tasks/task/${id}`);
export const fetchTasks = (id) => API.get(`tasks/alltasks/${id}`);
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTask = (id, updatedTask) => API.patch(`/tasks/${id}`, updatedTask);
export const doneTask = (id) => API.patch(`/tasks/task/${id}`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const comment = (value, id, userId, projectId) => API.post(`/comments/${id}?userId=${userId}&projectId=${projectId}`, {value});
export const fetchTaskComments = (id) => API.get(`/comments/${id}`);

export const signIn = (formData) => API.post('/auth/signin', formData);