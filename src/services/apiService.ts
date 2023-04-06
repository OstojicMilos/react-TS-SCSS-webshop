import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(error);
  }
);

async function get<T = any>(url: string, params?: any): Promise<T> {
  const response = await api.get<T>(url, { params });
  return response.data;
}

async function post<T = any>(url: string, data?: any, params?: any): Promise<T> {
  const response = await api.post<T>(url, data, { params });
  return response.data;
}

async function put<T = any>(url: string, data?: any, params?: any): Promise<T> {
  const response = await api.put<T>(url, data, { params });
  return response.data;
}

async function del<T = any>(url: string, params?: any): Promise<T> {
  const response = await api.delete<T>(url, { params });
  return response.data;
}

export const apiService = {
  get,
  post,
  put,
  delete: del,
};
