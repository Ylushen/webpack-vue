import axios from 'axios'
import { Message } from 'element-ui'

const axiosApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/admin' : '/api',
  timeout: 10000
})

const successCode = 200
const unLoginCode = 698

axiosApi.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 应数据做对响点什么
axiosApi.interceptors.response.use(function(response) {
  const data = response.data
  // 校验返回数据code
  switch (data.code) {
    case successCode:
      return Promise.resolve(data)
    case unLoginCode:
      Message.error(data.message)
      // todo 登录失效处理方法
      return Promise.reject(data)
    default:
      return Promise.reject(data)
  
  }
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axiosApi
