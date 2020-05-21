// 动态获取当前目录下所有的router文件。
const data = require.context('./', false, /\.router.js$/)
export default data.keys().map(key => data(key).default)
