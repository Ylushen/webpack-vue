const glob = require('glob-all')
describe('检查生成文件中的img文件', _ => {
  it('已生成img文件', done => {
    const files = glob.sync([
      './dist/imgs/test_urlLoader_*.jpg'
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('没有生成img')
    }
  })
})
