/* eslint-disable */

module.exports = {
    root: true,
    plugins: ["@typescript-eslint"],
    env: {
      es6: true,
      browser: true,
      jquery: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: `detect`
      }
    },
    globals: {
      Drupal: 'writable',
      DrupalBehavior: 'writable',
      React: 'readonly',
      ReactDOM: 'readonly',
      gsap: 'readonly',
      autoComplete: `writable`
    },
    plugins: [
      "react",
      "prettier"
    ],
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended"
    ],
    rules: {
      "react/prop-types": 0,
      "no-unused-vars": "warn",
      "prettier/prettier": 2,
    },
    ignorePatterns: [
      "**/node_modules/**/*",
    ],
  };
  