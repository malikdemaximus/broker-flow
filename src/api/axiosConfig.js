import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: process.env.VUE_APP_TD_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosConfig.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`
    return config
  },
  (error) => Promise.reject(error),
)

axiosConfig.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // const newAccessToken = await refreshAccessToken()
      // axiosConfig.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`
      return axiosConfig(originalRequest)
    }

    return Promise.reject(err)
  },
)

export default axiosConfig
