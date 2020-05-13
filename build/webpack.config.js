const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 模板
const path = require('path')
const glob = require('glob')


const rootDirName = process.cwd() // 获取当前活动目录
// 动态加载多也页面配置 规则 .src/分页名/index.js
const entry = {}
const HtmlWebpackPlugins = []
const regExpFileName = /src\/(.*)\/main.js/
glob.sync('./src/*/main.js').forEach(filePath => {
  const fileNameRegExp = filePath.match(regExpFileName)
  if (!fileNameRegExp) return
  const fileName = fileNameRegExp[1]
  entry[fileName] = path.join(rootDirName, `src/${fileName}/main.js`)
  HtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      template: path.join(rootDirName, `src/${fileName}/index.html`),
      filename: `${fileName}.html`,
      chunks: [fileName]
    })
  )
})

const config = {
  entry: entry,
  plugins: [].concat(HtmlWebpackPlugins)
}
module.exports = mode => {
  return merge(mode === 'development' ? devConfig : prodConfig, config, { mode })
}
