# Preferred ESLint Config

> 2 Main Steps

## 1. Setup Packages

### Pick one of 2 methods: Globally or Locally

#### Globally:

Run from any folder location:

```sh
npm install -g eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-promise
```

#### Locally (dev deps):

In your project folder:

```sh
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-promise
```

## 2. Setup Config File(s)

Instead of running `eslint --init`, I recommend copying the [sample `.eslintrc` file](#sample-eslintrc) into your `$HOME` folder.

To configure per project, copy the [`.eslintrc` file](#sample-eslintrc) into the project's root folder.

[Modify *rules* as needed.](https://eslint.org/docs/rules/)

### Sample `.eslintrc`

```js
{
  "extends": [
    "plugin:react/recommended",
    "prettier",
    "prettier/react",
    "prettier/standard"
  ],
  "plugins": [
    "react",
    "prettier"
  ],
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
    "es6": true,
    "node": true
  },
  "rules": {
    "no-console": 0,
    "comma-dangle": 0,
    "handle-callback-err": [2, "^(err|error)$"],
    "strict": 0,
    "quotes": [1, "single", { "allowTemplateLiterals": true, "avoidEscape": true }],
    "indent": ["error", 2, {
              "ignoredNodes": ["ConditionalExpression"],
              "ignoreComments": true,
              "MemberExpression": 1,
              "ArrayExpression": "first",
              "ObjectExpression": "first" }],
    "key-spacing": ["error", {
      "multiLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "align": {
        "beforeColon": false,
        "afterColon": true,
        "on": "value"
      }
    }]
  }
}
```
