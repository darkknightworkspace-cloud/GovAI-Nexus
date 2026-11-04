import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
})

export const publicApi = {
  getHome: () => api.get('/public/home'),
  getDepartments: (params) => api.get('/public/departments', { params }),
  getServices: (params) => api.get('/public/services', { params }),
  getSchemes: (params) => api.get('/public/schemes', { params }),
  getFeaturedSchemes: () => api.get('/public/schemes/featured'),
  getAnnouncements: (params) => api.get('/public/announcements', { params }),
  getStatistics: () => api.get('/public/statistics'),
  getFaqs: (params) => api.get('/public/faqs', { params }),
  search: (query, params) => api.get('/public/search', { params: { q: query, ...params } }),
}

export default api
