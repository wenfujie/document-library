
## commander 包使用说明
>`commander` 是一个 npm 包，是完整的 node.js 命令行解决方案。

使用 `commander` 可以完美解决接收指令参数、提供指令选项、设置多个子指令等问题。

以下是我整理的使用概览，具体细节可看
[官方使用说明](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

```javascript
// index.js

const { program } = require('commander')
program.version('0.0.1')

/**
 * option 方法：添加全局参数
 * 1.指令上的参数符号 {string} -参数缩写,--参数全称 例：'-d, --debug' or '--debug'
 * 2.指令描述 {string}
 * 3.默认值
 */
// 第一个参数可以忽略
program
  /**
   * {Boolean}
   * 用法：
   * 1.-s 返回true；
   * 2.不使用 返回undefined
   */
  .option('-s, --small', 'small pizza size')
  /**
   * {Boolean} 使用'no-'前缀.
   * 用法：
   * 1.不使用 返回true；
   * 2.-t 返回false
   */
  .option('-t, --no-test', '测试一下')
  /**
   * {String} 使用<type>后缀
   * 用法：
   * 1.-p test 返回'test';
   * 3.不使用 返回undefined
   * 注意：仅使用 -p 会异常，报参数丢失
   */
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  /**
   * [String,Boolean] 使用[type]后缀
   * 用法：
   * 1.-m 返回true；
   * 2.-m test 返回'test'；
   * 3.不使用 返回undefined
   */
  .option('-m, --more [type]', '可以是string或boolean')
  /**
   * {Array} 使用 <value...> 或 [value...]后缀
   * 用法
   * 1.-n 1 2 3 返回['1','2','3']
   */
  .option('-n, --number <numnber...>', '数组')
  .option('-nn, --numbers [numnbers...]', '数组')
  /**
   * 设置参数必填：使用requiredOption方法
   * 注意：该参数必须有值，否则异常。所以该参数最好设一个默认值，否则输入指令时必须带上该参数。
   */
  .requiredOption('-r, --require', '必填参数', false)

// 获取所运行指令的所有参数
const options = program.opts()

// 自定义指令
const wfjCli = program.command('wfj-cli')

// 自定义子指令以及触发回调
wfjCli
  // 子指令名称
  .command('init <filderName>')
  // 或者使用 arguments 方法配置参数
  // .arguments('<filderName>')
  .option('-s, --save', '指令参数')
  // 子指令描述
  .description('脚手架初始化的描述')
  // 回调
  .action((filderName) => {
    console.log(filderName, '---')
    // console.log('脚手架初始化事件出发', options)
  })

  // 该行放置末尾，解析option方法所构建的参数
  program.parse(process.argv)
```
**使用**
```bash
# 执行以下指令即可触发 wfj-cli 下的子指令 init 的回调
node index.js wfj-cli init filderName -s -t test
```