import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  method: 'get',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (!config.data) {
    config.data = {}
  }
  // if (config.method === 'get') {
  //   config.method = 'post'
  // }
  if (config.method === 'post' || config.method === 'get') {
    let data = {}
    for (const key in config.data) {
      if (config.data.hasOwnProperty(key)) {
        let i = config.data[key]
        if (i === '' || i === undefined || i === null) {
          continue
        }
        data[key] = i
      }
    }
    config.data = qs.stringify({
      ...data
    })
  }
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
