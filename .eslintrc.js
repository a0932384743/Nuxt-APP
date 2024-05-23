module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  plugins: ['vue'],
  rules: {
    'object-shorthand': 'warn',
    semi: [2, 'always'],
    quotes: [2, 'single'],
    'comma-dangle': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 0
  }
};
