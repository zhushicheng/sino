module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    // 允许箭头函数
    'arrow-parens': 0,
    // 允许回调函数写法
    'generator-star-spacing': 0,
    //禁止使用debugger
    // "no-debugger": 2,
    //nodejs 处理错误
    "handle-callback-err": 0,
    //语句强制分号结尾
    "semi": [2, "always"],
    // 使用 === 替代 ==
    "eqeqeq": [0, "allow-null"],
    //不能有声明后未被使用的变量或参数
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],
    //能用多余的空格
    "no-multi-spaces": 0,
    //空行最多不能超过2行
    "no-multiple-empty-lines": [1, {"max": 2}],
    //引号类型 `` "" ''
    "quotes": [0, "single"],
    // 控制逗号前后的空格
    "comma-spacing": [2, { "before": false, "after": true }],
    // 禁止使用alert
    "no-alert": 0,
    // 允许开发环境写debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
