'use strict';

const path = require('path');
module.exports = {
  // 构建发布环境。
  build: {
    env: {
      NODE_ENV: '"production"',
      API_BASE_URI: '"https://demo.cpyysyb.cn:56789/"',
      WS_URI: '"ws://39.107.233.167:8092/"',
      WORKFLOW_URI: '"http://39.107.233.167:8871/"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // 服务端开启即可，构建项目不需要开启
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  // 开发环境。
  dev: {
    env: {
      NODE_ENV: '"development"',
      API_BASE_URI: '"http://192.168.85.9:56789/"',
      WS_URI: '"ws://192.168.85.7:8902/"',
      WORKFLOW_URI: '"http://192.168.85.9:8872/"'
    },
    port: process.env.DEV_PORT || 8025,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
};
