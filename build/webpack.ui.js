const merge = require('webpack-merge')
const common = require('./webpack.comm')({ cssExtract: false, entry: false })
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打印分析图

const bapActive = false // 是否生成依赖包图
const config = {
  entry: {
    'ylushen-ui': path.join(__dirname, `../components`),
    'ylushen-ui.min': path.join(__dirname, `../components`)
  },
  output: {
    path: path.join(__dirname, '../lib'),
    filename: '[name].js',
    library: 'ylushenUI',
    libraryTarget: 'umd', // 引用模式
    libraryExport: 'default'
  },
  plugins: [
    new TerserPlugin({
      include: /\.min\.js$/
    })
  ].concat(bapActive ? [new BundleAnalyzerPlugin()] : [])
}

module.exports = mode => {
  return merge(config, common, { mode: 'none' })
}
