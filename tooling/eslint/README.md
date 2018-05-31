# Preferred ESLint Config

> 2 Main Steps

## 1. Setup Packages

### Pick one of 2 methods: Globally or Locally

#### Globally:

Run from any folder location:

```sh
npm install -g eslint babel-eslint eslint-config-airbnb eslint-plugin-promise eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier
```

#### Locally (dev deps):

In your project folder:

```sh
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-promise eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier
```

## 2. Setup Config File(s)

Instead of running `eslint --init`, I recommend copying the [sample `.eslintrc` file](#sample-eslintrc) into your `$HOME` folder.

To configure per project, copy the [`.eslintrc` file](#sample-eslintrc) into the project's root folder. 

[Modify *rules* as needed.](https://eslint.org/docs/rules/)

### Sample `.eslintrc`

```js
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "prettier/standard"
  ],
  "plugins": [ "react", "prettier", "promise" ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "modules": true,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "mocha": true,
    "node": true,
  },
  "globals": {
    "cy": true,
    "describe": true,
    "it": true,
    "test": true
  },
  "rules": {
    "semi": ["error", "never"],
    "comma-dangle": [1, "always-multiline"],
    "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
    "max-len": ["error", { "code": 120, "tabWidth": 2, "ignoreComments": true, "ignoreUrls": true }],
    "array-bracket-newline": 0,
    "array-element-newline": 0,
    "operator-linebreak": [ "error", "after", { "overrides": { "?": "ignore", ":": "ignore" } } ],
    "no-console": 0,
    "prefer-destructuring": ["error", { "array": true, "object": true }, { "enforceForRenamedProperties": false }],
    "handle-callback-err": [ 2, "^erro?r?$" ],
    "strict": 0,
    "quotes": [ 1, "single", { "allowTemplateLiterals": true, "avoidEscape": true } ],
    "no-unused-vars": ["warn", { "varsIgnorePattern": "(next)|(erro?r?)" }],
    "prefer-promise-reject-errors": 1,
    "no-throw-literal": 2,
    "no-unreachable": 1,
    "promise/always-return": 1,
    "promise/no-return-wrap": 1,
    "promise/param-names": 2,
    "promise/catch-or-return": 1,
    "promise/no-new-statics": 2,
    "promise/no-nesting": 1,
    "promise/no-promise-in-callback": 1,
    "promise/no-callback-in-promise": 1,
    "promise/avoid-new": 1,
    "promise/no-return-in-finally": 1,
    "promise/valid-params": 1
  }
}
```
