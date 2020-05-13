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

module.exports = (options = { cssExtract: true, entry: true }) => {
  return {
    entry: options.entry ? entry : {},
    // 缩小构建目标，提前定位到模块查找路径
    resolve: {
      alias: {
        vue: path.resolve(__dirname, '../node_modules/vue'),
        'element-ui': path.resolve(__dirname, '../node_modules/element-ui'),
        'ylushen-ui': path.resolve(__dirname, '../components'),
        '@': path.resolve(__dirname, '../src/index')
      },
      extensions: ['.js', '.vue'],
      mainFields: ['main'],
      modules: [path.join(__dirname, '../src'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|lib)/,
          // 多进程loader, 页面比较大的时候开启
          // [{
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 3
          //   }
          // }]
          use: ['babel-loader?cacheDirectory=true', 'eslint-loader'] // 开启缓存
        }, {
          test: /\.less$/,
          use: [
            options.cssExtract ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader', {
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
            options.cssExtract ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoPreFixer()
                ]
              }
            }]
        }, {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [{
            // image-webpack-loader 有问题
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'imgs/[name]_[hash:5].[ext]' // file-loader打包地址
            }
          }]
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
          console.log(`构建完成, 耗时：${status.endTime - status.startTime}ms`)
        })
      }
    ].concat(options.entry ? HtmlWebpackPlugins : []),
    stats: 'errors-only'
  }  
}
