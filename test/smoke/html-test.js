const glob = require('glob-all')
describe('检查生成文件中的html文件', _ => {
  it('已生成html文件', done => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html'
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('没有生成html')
    }
  })
})
