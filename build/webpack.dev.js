const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.comm')()
const config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热更新替换
  ],
  /**
   * eval
   * source-map 单独生成一个.map映射文件
   * inline-source-map 跟js打包到一起
   * cheap-source-map 只打印行错误信息
   * cheap-eval-source-map 打包eval的行错误信息
   * */
  devtool: 'cheap-eval-source-map'
}
module.exports = merge(common, config)
