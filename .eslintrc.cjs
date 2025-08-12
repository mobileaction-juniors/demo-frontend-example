/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'@vue/eslint-config-typescript',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  }
}
