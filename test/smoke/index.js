// 冒烟测试
const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')
const ora = require('ora')
const spinner = ora('正在执行构建代码打包中...')
const mocha = new Mocha({
  timeout: '10000ms'
})

// 进入测试模块目录
process.chdir(path.join(__dirname, 'template'));
// 执行测试
(async function run() {
  spinner.start()
  try {
    await cleanFiles()
    await webpackBuild()
  } finally {
    spinner.stop()
  }
  console.log('打包完成，开始执行测试用例')
  mocha.addFile(path.join(__dirname, './html-test.js'))
  mocha.addFile(path.join(__dirname, './js-css-test.js'))
  mocha.addFile(path.join(__dirname, './file-test.js'))
  mocha.run()
}())

// 执行打包代码
function webpackBuild() {
  return new Promise((resolve, reject) => {
    // 执行webpack
    webpack(require('../../build/webpack.config')('production'), (err, stats) => {
      if (err) {
        console.error()
        reject(err)
      } else resolve(stats)
    })
  })
}
// 清理文件夹
function cleanFiles() {
  return new Promise((resolve, reject) => {
    // 清楚目录
    rimraf('./dist', _ => {
      resolve()
    })
  })
}
