import axiosApi from '@/Api/axios'

class BaseApi {
  constructor(...agm) {
    // 请求模块路径
    this.BaseUrl = agm.join('/')
  }
  // 分页请求
  page(data) {
    return axiosApi.get(`/${this.BaseUrl}/page`, { params: data })
  }
  // 删除请求
  del(id) {
    return axiosApi.delete(`/${this.BaseUrl}/${id}`)
  }
  // 新增请求
  add(data) {
    return axiosApi.post(`/${this.BaseUrl}`, data)
  }
  // 更新请求
  update(data) {
    return axiosApi.put(`/${this.BaseUrl}`, data)
  }
  // 列表
  list(data) {
    return axiosApi.get(`/${this.BaseUrl}/list`, data)
  }
  // 自定义该模块下的get请求
  customize_get(url, data) {
    return axiosApi.get(`/${this.BaseUrl}${url}`, { params: data })
  }
  // 自定义该模块下的put请求
  customize_put(url, data) {
    return axiosApi.get(`/${this.BaseUrl}${url}`, data)
  }
  // 自定义该模块下的delete请求
  customize_delete(url, data) {
    return axiosApi.get(`/${this.BaseUrl}${url}`, data)
  }
  // 自定义该模块下的post请求
  customize_post(url, data) {
    return axiosApi.get(`/${this.BaseUrl}${url}`, data)
  }
}
export default BaseApi
