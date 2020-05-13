const express = require('express')
const app = express()

// 使用 Mock
const Mock = require('mockjs')
const pageData = size => Mock.mock({
  'total|10-999': 1,
  [`tableData|${size || 10}`]: [{
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'id': '@id',
    'name': '@cname',
    'phone|13000000000-20000000000': 1,
    'createTime': '@datetime',
    'status|1': ['1', '0']
  }]
})
const listData = _ => Mock.mock({
  'data|10': [{
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'id': '@id',
    'name': '@cname',
    'phone|13000000000-20000000000': 1,
    'createTime': '@datetime',
    'status|1': ['1', '0']
  }]
})
const success = {
  code: 200,
  message: '操作成功'
}
app.get('/test/page', function(req, res) {
  console.log(req.query)
  setTimeout(_ => res.send({ ...success, data: pageData(req.query && req.query.size) }), 500)
})
app.post('/test', function(req, res) {
  res.send(success)
})
app.delete('/test/*', function(req, res) {
  res.send(success)
})
app.put('/test', function(req, res) {
  res.send(success)
})
app.get('/test/list', function(req, res) {
  res.send({ ...success, data: listData().data })
})

app.listen('9999', () => {
  console.log('监听端口 9999')
})
