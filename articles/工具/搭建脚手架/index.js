const { program } = require('commander')
program.version('0.0.1')

/**
 * option 方法
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

// 自定义指令以及触发回调
wfjCli
  .command('init')
  .description('脚手架初始化的描述')
  .action((source, destination) => {
    console.log(source, destination, '---')
    // console.log('脚手架初始化事件出发', options)
  })

// program.parse(process.argv)
