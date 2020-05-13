// 校验commit-msg方法。vue迁移过来
const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()
// 专长|修复|抛光|文档|样式|重构|性能|测试|工作流程|城市|杂务|类型|构建
const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' 错误 ')} ${chalk.red(`无效的提交消息格式。`)}\n\n` +
    chalk.red(`  自动生成变更日志需要正确的提交消息格式。 例子：\n\n`) +
    `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
    `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
    chalk.red(`  有关更多详细信息，请参见 .github/COMMIT_CONVENTION.md\n`) +
    chalk.red(`  您还可以使用 ${chalk.cyan(`npm run commit`)} 交互式地生成提交消息。\n`)
  )
  process.exit(1)
}
