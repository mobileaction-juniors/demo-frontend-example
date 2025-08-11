module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module"
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  settings: { "import/resolver": { typescript: true, node: true } },
  rules: {
    "import/extensions": ["error", "ignorePackages", { ts: "never", vue: "always" }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-console": ["warn", { allow: ["warn", "error"] }]
  }
};
