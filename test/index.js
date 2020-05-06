const path = require('path')
process.chdir(path.join(__dirname, 'smoke/template'))

describe('vue-webpack 测试用例', _ => {
  require('./unit/webpac-common-test')
  require('./smoke')
})
