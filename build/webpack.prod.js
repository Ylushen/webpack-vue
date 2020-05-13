const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.comm')()
// const webpack = require('webpack')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 分析速度
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打印分析图
const TerserPlugin = require('terser-webpack-plugin') // 并行压缩
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 模块缓存，极大优化构建速度

const smp = new SpeedMeasureWebpackPlugin()
const smpActive = false // 是否打印速度分析日志
const bapActive = false // 是否生成依赖包图
const tpActive = false // 是否开启多线程并行压缩, 线程数

const rootDirName = process.cwd() // 获取当前活动目录
const config = {
  output: {
    path: path.join(rootDirName, 'dist'),
    filename: 'static/[name]_[chunkhash:8].js'
  },
  // cdn引入配置
  // externals: {
  //   vue: 'Vue',
  //   'element-ui': 'ELEMENTUI'
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
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
    },
    // 如果项目比较小，不建议开启，多线程启动需要时间
    minimizer: [
      new TerserPlugin({
        parallel: tpActive, // 线程数，默认cpu线程的两倍
        cache: true // 开启缓存
      })
    ]
  },
  plugins: [
    // dll分包用法
    // new webpack.DllReferencePlugin({
    //   manifest: require('../static/js/elementUI.json')
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: require('../static/js/vue.json')
    // }),
    new HardSourceWebpackPlugin() // 开启模块缓存
  ].concat(bapActive ? [new BundleAnalyzerPlugin()] : [])
}
module.exports = smpActive ? smp.wrap(merge(common, config)) : merge(common, config)
