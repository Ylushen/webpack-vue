// DLL打包配置文件
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vue: [
      'vue'
    ],
    elementUI: [
      'element-ui'
    ]
  },
  output: {
    filename: '[name]_[hash].dll.js',
    path: path.join(__dirname, 'static/js'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(__dirname, 'static/js/[name].json')
    })
  ]
}
