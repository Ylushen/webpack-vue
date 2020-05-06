const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack4') // vue-loader
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空打包文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin') // 模板
const autoPreFixer = require('autoprefixer') // 自动添加前缀
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 把样式提取出来
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化打印日志样式
const path = require('path')
const glob = require('glob')



const rootDirName = process.cwd() // 获取当前活动目录
// 动态加载多也页面配置 规则 .src/分页名/index.js
const entry = {}
const HtmlWebpackPlugins = []
const regExpFileName = /src\/(.*)\/index.js/
glob.sync('./src/*/index.js').forEach(filePath => {
  const fileNameRegExp = filePath.match(regExpFileName)
  if (!fileNameRegExp) return
  const fileName = fileNameRegExp[1]
  entry[fileName] = path.join(rootDirName, `src/${fileName}/index.js`)
  HtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      template: path.join(rootDirName, `src/${fileName}/index.html`),
      filename: `${fileName}.html`,
      chunks: [fileName]
    })
  )
})

module.exports = {
  entry: entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoPreFixer()
              ]
            }
          }]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoPreFixer()
              ]
            }
          }]
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'url-loader'
      }, {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      }, {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name]_[contenthash:8].css'
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function doneError() {
      this.hooks.done.tap('done', status => {
        console.log('构建完成, 自定义函数')
      })
    }
  ].concat(HtmlWebpackPlugins),
  stats: 'errors-only'
}
