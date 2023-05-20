module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'padded-blocks': 'off',
    'no-useless-catch': 'off',
    'prefer-regex-literals': 'off',
    camelcase: 'off'
  }
}
