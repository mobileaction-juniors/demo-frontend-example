/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.cy.js'
      ],
      env: {
        mocha: true
      },
      globals: {
        cy: 'readonly',
        Cypress: 'readonly'
      }
    }
  ]
}
