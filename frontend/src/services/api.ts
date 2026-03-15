import axios from 'axios'

const API = axios.create({
  baseURL: '/api/v1',
})

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ─── Auth ───
export const authAPI = {
  signup: (data: { username: string; email: string; password: string; confirmPassword: string }) =>
    API.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    API.post('/auth/login', data),
  logout: () =>
    API.post('/auth/logout'),
}

// ─── Slambooks ───
export const slambookAPI = {
  create: (data: { title: string; description?: string; questions: Array<{ questionText: string; fieldType: string; isRequired: boolean }> }) =>
    API.post('/slambooks', data),
  getMine: () =>
    API.get('/slambooks/my-slambooks'),
  getById: (id: string) =>
    API.get(`/slambooks/${id}`),
  getPublic: (slug: string) =>
    API.get(`/slambooks/public/${slug}`),
  delete: (id: string) =>
    API.delete(`/slambooks/${id}`),
}

// ─── Entries ───
export const entryAPI = {
  submit: (slambookId: string, data: { fillerName: string; answers: Record<string, string> }) =>
    API.post(`/entries/submit/${slambookId}`, data),
  getBySlambook: (slambookId: string) =>
    API.get(`/entries/slambook/${slambookId}`),
}

export default API
