import axios from 'axios'

const axiosConfig = axios.create({
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

export default axiosConfig
