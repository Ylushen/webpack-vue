const glob = require('glob-all')
describe('检查生成文件中的css js文件', _ => {
  it('已生成的css js文件', done => {
    const files = glob.sync([
      './dist/static/index_*.js',
      './dist/static/search_*.js',
      './dist/static/vue_*.js',
      './dist/static/elementUI_*.js',
      './dist/static/elementUI_*.css',
      './dist/static/index_*.css',
      './dist/static/mobile_*.css'
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('没有生成css js')
    }
  })
})
