const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

module.exports = mode => {
  return merge(mode === 'development' ? devConfig : prodConfig, { mode })
}
