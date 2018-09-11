'use strict'

//颜色输出插件
const chalk = require('chalk')
//语义化版本校验插件
const semver = require('semver')
//依赖定义文件
const packageConfig = require('../package.json')

// 根据传入的命令执行
const exec = (cmd) => {
  return require('child_process').execSync(cmd).toString().trim()
}

//定义依赖的版本
const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'yarn',
    currentVersion: exec('yarn --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = () => {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + '版本错误,当前版本' +
        chalk.red(mod.currentVersion) + ',至少被要求的版本为:' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log(chalk.yellow('存在版本错误:'))
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    process.exit(1)
  }
}
