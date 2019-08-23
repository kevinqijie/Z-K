import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(
  config => {
    let t = localStorage.getItem('token')
    if (t) {
      config.headers.Authorization = t
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截响应
axios.interceptors.response.use(
  response => {
    // console.log(response)
    return response
  },
  err => {
    console.log(err.response)
    if (err.response) {
      switch (err.response.status) {
        case 401:
          localStorage.removeItem('token')
          router.push({ path: '/login' })
      }
    }
    return Promise.reject(err)
  }
)

export default axios
