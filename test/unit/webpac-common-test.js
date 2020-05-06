const assert = require('assert')
const path = require('path')
describe('测试 webpack-common 基本功能', _ => {
  const commonConfig = require('../../build/webpack.comm')
  it('entry', done => {
    assert.equal(commonConfig.entry.index, path.join(__dirname, '../smoke/template/src/index/index.js'), '入口文件错误')
    assert.equal(commonConfig.entry.mobile, path.join(__dirname, '../smoke/template/src/mobile/index.js'), '入口文件错误')
    done()
  })
})
