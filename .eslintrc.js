module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    'browser': true
  },
  rules: {
    "no-unused-vars": "off",
    "no-case-declarations": "off",
    "no-undef": "off"
  }
};
