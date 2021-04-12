/* eslint-disable */

module.exports = {
    root: true,
    plugins: ["@typescript-eslint", "jest"],
    env: {
      es6: true,
      browser: true,
      node: true,
      "jest/globals": true
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
      "plugin:prettier/recommended",
      "plugin:jest/recommended"
    ],
    rules: {
      "react/prop-types": 0,
      "no-unused-vars": "warn",
      "prettier/prettier": 2,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    },
    ignorePatterns: [
      "**/node_modules/**/*",
    ],
  };
  