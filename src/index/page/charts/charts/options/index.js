// 动态获取当前目录下所有的option配置文件。
const data = require.context('./types', false, /\.js$/)
export default data.keys().map(key => data(key).default)
