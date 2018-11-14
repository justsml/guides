# Preferred ESLint Config

> 2 Main Steps

## 1. Setup Packages

### Pick one of 2 methods: Globally or Locally

#### Globally:

Run from any folder location:

```sh
npm install -g eslint babel-eslint eslint-config-airbnb eslint-plugin-promise eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier
```

#### Locally (development deps):

In your project folder:

```sh
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-promise eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-config-prettier eslint-plugin-prettier prettier
```

## 2. Setup Config File(s)

Instead of running `eslint --init`, I recommend copy and pasting the sample `.eslintrc` file manually. The instructions are below: 

* `cd <your-project-folder>`
* `touch .eslintrc` 
* Open `.eslintrc` with your text editor
* Copy and paste [sample `.eslintrc` file](#sample-eslintrc) into the file
* Save the file
* Make sure it copied properly: `cat .eslintrc` 

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
    "array-bracket-newline": 0,
    "array-element-newline": 0,
    "brace-style": [2, "1tbs", {"allowSingleLine": true}],
    "comma-dangle": [1, "always-multiline"],
    "handle-callback-err": [ 2, "^erro?r?$" ],
    “indent”: [“error”, 2],
    "max-len": ["error", { "code": 120, "tabWidth": 2, "ignoreComments": true, "ignoreUrls": true }],
    "no-console": 0,
    "no-throw-literal": 2,
    "no-unreachable": 1,
    "no-unused-vars": [1, { "args": "none" }],
    "operator-linebreak": [2, "after", { "overrides": { "?": "ignore", ":": "ignore" } } ],
    "prefer-destructuring": [2, { "array": true, "object": true }, { "enforceForRenamedProperties": false }],
    "prefer-promise-reject-errors": 1,
    "promise/always-return": 1,
    "promise/avoid-new": 1,
    "promise/catch-or-return": 1,
    "promise/no-callback-in-promise": 1,
    "promise/no-nesting": 1,
    "promise/no-new-statics": 2,
    "promise/no-promise-in-callback": 1,
    "promise/no-return-in-finally": 1,
    "promise/no-return-wrap": 1,
    "promise/param-names": 2,
    "promise/valid-params": 1,
    "quotes": [ 2, "single", { "allowTemplateLiterals": true, "avoidEscape": true } ],
    "react/prop-types": 0,
    "semi": ["error", "never"],
    "strict": 0
  }
}
```
