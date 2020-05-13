const assert = require('assert')
const path = require('path')
describe('测试 webpack-config 基本功能', _ => {
  const webpackConfig = require('../../build/webpack.config')('production')
  it('entry', done => {
    assert.equal(webpackConfig.entry.index, path.join(__dirname, '../smoke/template/src/index/main.js'), '入口文件错误')
    assert.equal(webpackConfig.entry.mobile, path.join(__dirname, '../smoke/template/src/mobile/main.js'), '入口文件错误')
    done()
  })
})
