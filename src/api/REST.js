import axiosConfig from './axiosConfig'

const GET = async (url, params = {}, headers = {}, baseURL) => {
  const responseType = 'json'
  try {
    const response = await axiosConfig({
      baseURL: baseURL || process.env.VUE_APP_BGM_API_URL,
      url,
      method: 'GET',
      params,
      headers,
      responseType,
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const POST = async (url, data = {}, headers = {}, baseURL) => {
  try {
    const response = await axiosConfig({
      baseURL: baseURL || process.env.VUE_APP_BGM_API_URL,
      url,
      method: 'POST',
      data,
      headers,
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const PUT = async (url, data = {}, headers = {}, baseURL) => {
  try {
    const response = await axiosConfig({
      baseURL: baseURL || process.env.VUE_APP_BGM_API_URL,
      url,
      method: 'PUT',
      data,
      headers,
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

const DELETE = async (url, headers = {}, baseURL) => {
  try {
    const response = await axiosConfig({
      baseURL: baseURL || process.env.VUE_APP_BGM_API_URL,
      url,
      method: 'DELETE',
      headers,
    })

    if (response.status >= 200 && response.status < 300) {
      return {
        ...response,
        success: true,
      }
    }

    return {
      ...response,
      success: false,
    }
  } catch (error) {
    return {
      ...error?.response,
      success: false,
    }
  }
}

export { GET, POST, PUT, DELETE }
