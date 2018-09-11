'use strict';

//执行版本检查
require('./check-versions')();
//可调用shell命令
require('shelljs/global');

env.NODE_ENV = 'production';

//loading
const ora = require('ora');
//文件或者路径处理
const path = require('path');
//控制台颜色输出插件
const chalk = require('chalk');
const webpack = require('webpack');
//环境配置相关
const config = require('../config');
//生产webpack配置
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('生产环境构建');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'client/assets/*', assetsPath);

const compiler = webpack(webpackConfig);
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
compiler.apply(new ProgressPlugin());

compiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  spinner.succeed();
  spinner.stop();
  console.log(chalk.cyan('  构建完成\n'));
});
