module.exports = {
  extends: [
      'eslint-config-alloy/vue',
  ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // Vue: false
  },
  rules: {
    'no-tabs': 0,
    // // @fixable 一个缩进必须用两个空格替代
    // "indent": ["error", "tab", {
    //   VariableDeclarator: 2,
    // }]
    'prefer-promise-reject-errors': 0,
    'indent': [
      'warn',
      2,
      {
          SwitchCase: 1,
          // flatTernaryExpressions: false
      }
    ],
  }
};