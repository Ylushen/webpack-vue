const en = 'feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build'
const zh = '专长|修复|抛光|文档|样式|重构|性能|测试|工作流程|城市|杂务|类型|构建'
const enArr = en.split('|')
const zhArr = zh.split('|')
console.log(enArr.reduce((total, item, index) => {
  return total + `* ${item}: ${zhArr[index]}\n`
}, ''))
