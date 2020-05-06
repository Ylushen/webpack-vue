const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.comm')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 分析速度
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const smp = new SpeedMeasureWebpackPlugin()
const smpActive = false // 是否打印速度分析日志

const rootDirName = process.cwd() // 获取当前活动目录
const config = {
  output: {
    path: path.join(rootDirName, 'dist'),
    filename: 'static/[name]_[chunkhash:8].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]_?vue/,
          priority: 10,
          name: 'vue'
        },
        elementUI: {
          test: /[\\/]node_modules[\\/]_?element-ui/,
          priority: 20,
          name: 'elementUI'
        }
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
module.exports = smpActive ? smp.wrap(merge(common, config)) : merge(common, config)
