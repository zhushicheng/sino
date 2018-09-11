'use strict'
//可调用shell命令
require('shelljs/global')
//控制loading
const ora = require('ora')

const spinner = ora('清理环境').start()

// //清理锁定文件
rm('-rf', 'yarn.lock')

//清理依赖目录
rm('-rf', 'node_modules')

//清理错误文件
rm('-rf', 'yarn-error.log')

//清理构建输出
rm('-rf', 'dist')
spinner.succeed()
spinner.stop()
