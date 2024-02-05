import axios from 'axios'
import Vue from 'vue'

const neteaseAxios = axios.create({
  baseURL: 'http://music.163.com/',
})

const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API_URL,
  baseURL: process.env.VUE_APP_BASE_API_URL,
})


request.interceptors.response.use(
  (response) => {
    window.response = response

    if (response.status === 200 && response.data.code === 200) {
      return response.data
    }
    return Promise.reject(response)
  },
  (error) => {
    Vue.prototype.$mmToast(error.response ? error.response.data.message : error.message)
    return error
  },
)

const axiosOrigin = axios.create({
  baseURL: process.env.VUE_APP_FromBili_BASE_API_URL,
})

axiosOrigin.interceptors.response.use(
  (response) => {
    window.response = response

    if (response.status === 200) {
      return response
    }
    return Promise.reject(response)
  },
  (error) => {
    Vue.prototype.$mmToast(error.response ? error.response.data.message : error.message)
    return error
  },
)

// export default request
export {neteaseAxios, request, axiosOrigin}
