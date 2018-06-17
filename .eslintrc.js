module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/html-indent': ['error', 2],
    'vue/require-prop-types': 'error',
    'vue/html-quotes': ['error', 'single'],
    'vue/order-in-components': 'error',
    'no-console': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
