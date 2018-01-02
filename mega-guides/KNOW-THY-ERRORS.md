# Dan's Bug Hunting Tips & Tricks
### _for JavaScript_

This is a quick rundown on key JavaScript `Error` and Exception handling pitfalls. 

Includes snippets which apply across the JS ecosystem, including Client-side, Back-end and everything in-between! 

--------

> Everyone from rookies to Node Team members forget this shit all the time. Myself included.
This is my attempt to collect my assorted debugging tips, reminders, tricks and magic.


## Table of Contents
1. [👌 Shit](#-shit)
    1. [Error Pitfall #1](#error-pitfall-1)
    1. [`Error.callStackLimit = 50`](#errorcallstacklimit)
    1. [FIX: `Error` to JSON](#error-to-json) is empty object
1. [Express](#express)
    1. Required: [Request Logging (`morgan`, etc)](#request-logging)
    1. Required: [404 Not Found Handler](#404-not-found-handler)
    1. Required: [500 Exception Handler](#500-error-handler)
1. [Promises (when you use `knex`, `axios`, `fetch`, etc it's Promises)](#promises)
    1. [`Promise.reject()`](#promise-reject)
    1. [Catching Errors](#catching-errors)
    1. Never use `.then`'s 2nd parameter
1. [React & React Native](#react--react-native)
    1. [Faster Simulator](#faster-simulator)
1. [IDE / Environment](#ide--environment)
    1. [Auto `eslint`](#auto-eslint)
    1. [Auto Complete Tools](#auto-complete-tools)
    1. Prettier: Auto Formatting

* **Code Samples**
    * [Custom Error](#custom-errors) Types/Classes
    * [Util Methods](#util-methods)
        * [toPlainObject](#toplainobject) - For getting all possible properties from an object.
        * [getTaxonomy](#gettaxonomy) - Print Class Inheritance Hierarchy


---------------


## 👌 Shit

### Error Pitfall #1

> HOWTO: Correctly `throw`/`new` `Error`'s

_Similar to the topic in the Promises section on `Promise.reject`_

**Bad & Correct Examples:**

```js
// INCORRECT: DON'T THROW STRINGS!!!
throw 'Invalid Usage, May Fail Silently'

// CORRECT: Use `new Error()`
throw new Error('Will have call stack & other exception details provided in the ctx of the callsite')
```

> **Using correct method ensures you get best possible stack traces in any runtime/engine.**

### `Error.callStackLimit`

`Error.callStackLimit` is a little-known gem of a feature. 

Ever struggle to find *your code* in a stack trace? 

Endless functions in `node_modules`, yet none of your files?

Well, this fixes it 50-75% of the time: add the next line to the top of your entrypoint file (likely `index.js` or `app.js`).

```js
// Opt #1: Add to the top of your first file - set before any Error might be created
Error.callStackLimit = 50 // IMPORTANT: Will kill performance - disable in production

// Opt #2: In Node Apps use something like this:
if (process.env.NODE_ENV !== 'production') { Error.stackTraceLimit = 50; }
```

> `Error.callStackLimit` works on both NodeJS & Browser apps! 

*Bonus:* Here's another way to log a stack trace: `console.trace('Print Trace of Function Sequence that got us here')`

--------------


### `Error` to JSON

#### Problem

`JSON.stringify`ing an `Error` instance fails to include expected keys. 

> [tldr](#tldr-quick-fixes)

I've seen this cause problems in Chrome console logging, analytics/tracking libraries, and Express apps' `res.send(json)` or `res.json(json)`, etc.


> **Interview Question:** What do you think this code returns?
>
> `JSON.stringify(new Error('Oh noes'))`
>
> _Hint:_ `assert(err.message === 'Oh noes')`


--------------

> [.... think about it ....]

>
> 🕕
>
> 🕖
>
> 🕗
>
> 🕘
>
> 🕙
>
> 🕚
>
> 🕛

--------------


> **Answer:** An empty object `{}`


#### WHAT is going on??? 💩

> Do you know about `Object.keys()`'s often forgotten cousin `Object.getOwnPropertyNames()`?

Let's look at some example code.

**Examine the 3 different log outputs:**

```js
const err = new AppError({httpStatus: 420, httpMessage: 'Traffic too hi',  message: 'Sad Panda', stack: null})

console.log('.getOwnPropertyNames: ', Object.getOwnPropertyNames(err).sort().join(','))
// -> .getOwnPropertyNames: httpMessage,httpStatus,message,stack

console.log('.keys: ', Object.keys(err).sort().join(','))
// -> .keys: httpMessage,httpStatus

console.log('err: ', JSON.stringify(err, null, 1))
// JSON.stringify -> 
// err:  {
//   "httpStatus": 420,
//   "httpMessage": "Traffic too hi"
//  }
```

> Consider how `JSON.stringify` is likely implemented?


#### TLDR; quick fixes!

Get the important keys out of the Object/Error manually: 

1. [Check out my simple fix function: `toPlainObject(obj)`](#util-method-toplainobjectobj)
1. Some more express-specific solution(s) might look like either:
    1. Required: `const errorInfo = err => {error: 'Server Error', message: err.message, stack: err.stack}`
    1. Pick one: `if (err) return next(errorInfo(err))`
    1. Pick one: `if (err) return res.status(500).json(errorInfo(err))`
    1. Pick one: `promise.then(fn).catch(err => next(errorInfo(err)))`
    1. Plenty alternatives exist



---------------


## Express

> [For my complete `App.js` starter file, click here!](https://gist.github.com/justsml/2bff3dcb7d35a1789c4c4dd61403e446)

#### Request Logging

Install the [`morgan`](https://www.npmjs.com/package/morgan) logging lib. 

It will log (to terminal) any requests made to your node HTTP server.

**For all those times you wondered, "am I even requesting file X correctly?"**

##### Some example code/usage:

[**See Correct Implementation**](https://gist.github.com/justsml/2bff3dcb7d35a1789c4c4dd61403e446/f53cf8060d246f211b7ac3e0796601575699238c#file-app-js-L9-L13)

**Rough usage example:**

```js
// Add to your Express App.js entry file
const devMode     = process.env.NODE_ENV !== 'production'
const morgan      = require('morgan')

// then add the following after your body-parsers
app.use(morgan(devMode ? 'dev' : 'combined'))
```


#### 404 Not Found Handler

The last `app.use(req,res[,next])` will become your defacto 'File Not Found' handler.

Makes sense, considering all middleware and routes are applied in the sequence they were setup.

```js
// Add right before the final error handler middleware (see next tip) 
app.use(function _notFound(req, res, next) {
  console.error('File not found:', req.originalUrl);
  res.status(404).send({error: 'Url not found.', url: req.originalUrl});
});

```

#### 500 Error Handler

One method is add call a final `app.use()` with a 4-argument function, like so: `app.use((err, req, res, next) => {})`.
This will become your auto-magic error handler.
_Makes little sense, but it works._

An approach I've found to be problematic uses something roughly like `server.listen(3000).on('error', err => console.error('OnError:', err))`. 

**Note:** While the `server.on('error')` style may seem to work, I've had trouble losing stack traces and getting erroneous messages with certain tool combos (notable, yet junk libs like `Q/$q` & `async` are partly to blame).

```js
// Express 4-arg Error Handler:
app.use(function _errorHandler(err, req, res, next) {
  console.error('ERROR', err);
  res.status(500).send({error: err.message, stack: err.stack, url: req.originalUrl});
});
```

---------------

## Promises

#### `Promise.reject`

Make sure you use correct error invocations:

```js
// INCORRECT: DON'T THROW STRINGS!!!
return Promise.reject('Invalid Usage, May Fail Silently')

// CORRECT: Use `new Error()`
return Promise.reject(new Error('Will have call stack & other exception details provided in the ctx of the callsite'))
```


## React / React Native

#### Faster Simulator
https://developer.android.com/studio/run/emulator-acceleration.html

---------------

## IDE / Environment

#### Linting:

Linting enforces per-project code styling rules. This should minimally be used in build steps or deploy/distribution tasks.

`eslint` will catch bugs in your code and enforce consistency based off `.eslintrc` config.

`standard js` is another popular option - quite easy to setup - but it's more geared towards auto-fixable issues.

##### _Notes_

> If you find a high-level debate about the virtue of linting. **Ignore it.**
> 
> It's the same as saying: _I'm a great driver, so, not only don't I need headlights, I can skip those silly seatbelts too! Seems like a choking hazard anyway!_

Driving habits aside, clearly we should at least **avoid coding carelessly.**

*We might as well catch errors early, upon saving.* 

**Atom Note:** If Atom auto-save feature is slowing things down, add a 1-3 sec delay in the settings somewhere.



##### JS Lint Tools:

1. [*ESLint*](https://github.com/eslint/eslint#global-installation-and-usage) **The defacto standard js linter in 2016-2017+**

```sh
# Install pkgs locally
npm install eslint@3.x babel-eslint@7 --save-dev
```

> [Docs: Config options for eslintrc](https://eslint.org/docs/user-guide/configuring#configuring-rules)

**Example `.eslintrc.js`:**
```json
module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "no-var": 0,
    "max-len": 0,
    "prettier/prettier": ["error", { "trailingComma": "es5" }]
  },
  "env": {
    "node": true,
    "mocha": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false,
    "ecmaFeatures": {
      "ecmaVersion": 6,
      "jsx": true,
      "experimentalObjectRestSpread": true,
    },
  }
}
```

##### An alternative to **ESLint**:

1. [*Standard JS*](https://github.com/standard/standard) **Rapidly rising popularity.**
	1. Code: https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs
	1. Atom: https://atom.io/packages/linter-js-standard-engine
	1. Atom: https://atom.io/packages/standard-formatter
	1. VIM: https://github.com/w0rp/ale



#### Auto Complete Tools

1. VS Code has included great auto-complete out-the-box for a while!

1. Atom has many options... That said, **I'd avoid all [except `atom-ternjs`](https://atom.io/packages/atom-ternjs)** 


---------------



## Custom Errors


> IMHO, this is one of few valid use-cases for the ES6 `class` syntax. 
Inheritance with `class/extends` is just harder to mess up compared to older methods: `Object.create`, `Error.prototype`, `util.inherit`, etc.

**Lets outline & checkout example code:**

#### Class Hierarchy:
```
- Error            (built-in, extends `Function` built-in)
  - HttpError      (extends `Error`)
    - AppError     (extends `HttpError`)
    - ServiceError (extends `HttpError`)
```

#### Code:

```js
class HttpError extends Error {
    constructor(details) {
        super(typeof details === 'string' ? details : 'ERROR: message wasn\'t specified')
        if (typeof details === 'object') Object.assign(this, details)
    }
}

// Create 2 classes based off of HttpError
class AppError extends HttpError { }
class ServiceError extends HttpError { }
```


--------------


## Util Methods

#### **toPlainObject**
> Goal: Merge all instance properties into a fresh POJO - this is inclusive of inherited members/keys.
> This is a `JSON.stringify` and `res.json` friendly method.

**TODO** `toPlainObject()`

1. Circular variable reference detection.
1. Callback overrides
1. Key exclusions


**Example usage:**

```js
toPlainObject(new AppError({aborted: false, external: true, message: 'Test Error'})
// => {aborted: false, external: true, message: 'Test Error', stack: [...]}
```

##### Usage & Code: `toPlainObject(obj)`

```js
// More advanced sample!
const e = new AppError({message: 'Test Error', stack: null})
console.log('message:', e.message)
console.log('   json:', JSON.stringify(e))
console.log('   keys:', Object.keys(e))
console.log('   gopn:', Object.getOwnPropertyNames(e))

console.log('Wrapped with toPlainObject:\n')
console.log('   json:', JSON.stringify(toPlainObject(e)))
console.log('   keys:', Object.keys(toPlainObject(e)))

/*
@summary
toPlainObject: 
*/
function toPlainObject(obj) {
	if (obj === null || obj === undefined || typeof obj !== 'object') return obj

	return Object.getOwnPropertyNames(obj)
	.reduce((output, key) => {
		output[key] = _getVal(obj[key])
		return output
	}, {})
}

function _getVal(v) {
  if (v === null || v === undefined) return v
  if (v instanceof Date) return v.toISOString()
  if (/Number|Boolean|String/.test(v.constructor && v.constructor.name || '')) return v
  if (Array.isArray(v)) return v.map(toPlainObject)
  if (typeof v === 'object') return toPlainObject(v)
  return v
}


```


#### **getTaxonomy**
> Goal: Merge all instance properties into a fresh POJO - this is inclusive of inherited members/keys.
> This is a `JSON.stringify` and `res.json` friendly method.

**Example usage:**

```js
getTaxonomy(new AppError('error').join(' -> '))  
// => Error -> HttpError -> AppError
```

##### Usage & Code: `getTaxonomy(obj)`

```js

getTaxonomy(new Error('error'))     // -> [ 'Error' ]
getTaxonomy(new HttpError('error')) // -> [ 'Error', 'HttpError' ]
getTaxonomy(new AppError('error'))  // -> [ 'Error', 'HttpError', 'AppError' ]
getTaxonomy(new AppError('error').join(' -> '))  // => "Error -> HttpError -> AppError"
getTaxonomy(AppError)  // -> [ 'Function' ] 
getTaxonomy(parseInt)  // -> [ 'Function' ]
// [ 'Function' ] Indicates obj NOT an instance

function getTaxonomy(o, taxonomy = []) {
  o = taxonomy.length <= 0 ? o.__proto__.constructor : o && o.__proto__
	return !o || !o.name || taxonomy.indexOf('Function') > -1 ? taxonomy : getTaxonomy(o, [o.name].concat(taxonomy))
}

```


