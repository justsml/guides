# Dan's JS Cheat Sheet

> Example-heavy JS reference notes.

1. [**Functions Essentials**](#1-functions-essentials)
    * [Simple No Args - 3 examples](#simple-no-args---3-examples)
    * [Single Argument - 5 examples](#single-argument---5-examples)
    * [Multiple Arguments - 3 examples](#multiple-arguments---3-examples)
    * [Destructuring](#destructuring)
1. [**String Literals**](#2-string-literals)
1. [**Objects**](#3-objects)
    * [Inline Methods/Functions - 4 methods](#inline-methodsfunctions---4-methods)
    * [Class Methods/Functions - 4 methods](#class-methodsfunctions---4-methods)
1. [**Promises Are Awesome!**](#4-promises-are-awesome)
    * [**1. Promise Basics**](#41-promise-basics)
    * [**2. Use Existing Functions**](#42-use-existing-functions)
    * [**3. Seeing inside the chain**](#43-seeing-inside-the-chain)
    * [**4. Util Methods**](#44-util-methods)
    * [**5. Errors**](#45-errors)
    * [**6. Getting Up Close & Personal**](#46-getting-up-close--personal)

------------------

## 1. Functions Essentials

### Simple No Args - 3 examples

```js
function one() {
  return 1; 
}
// ES6 Fat Arrow Functions
const one = () => { return 1; }
const one = () => 1;
//                ^ Look ma! No `return` - simply by omitting curly braces
```

```js
// Example Output:
one() //=> 1
```

### Single Argument - 5 examples

```js
// 5 Identical ways to accept a *single* argument in your functions
function echo(val) {
  return val;
}
const echo = (val) => { return val; }
const echo = val   => { return val; }
const echo = (val) => val;
const echo = val   => val;
```

```js
// Example Output:
echo('hello') //=> 'hello'
```

### Multiple Arguments - 3 examples

```js
// 3 Identical ways to accept *multiple* arguments in your functions
function combine(a, b) {
  return a + b;
}
const combine = (a, b) => { return a + b; }
const combine = (a, b) => a + b;
```

```js
// Example Output:
combine('abc', '123') //=> 'abc123'
```


### Destructuring

```js
// Use Destructuring to 'unpack' value(s) from an object:
function greeting(user) {
  return 'Hello ' + user.name;
}
function greeting({name}) {
  return 'Hello ' + name;
}

// With Arrow function - parens required:
const greeting = ({name}) => { return 'Hello ' + name; }
// Getting Multiple arguments:
const greeting = ({firstName, lastName}) => { return 'Hello ' + firstName + ' ' + lastName; }
const greeting = ({firstName, lastName}) => 'Hello ' + firstName + ' ' + lastName

// Usage

greeting({firstName: 'Dan', lastName: 'Levy'}) //=> 'Hello Dan Levy'

```

------------------

## 2. String Literals

```js
// Cleaner more expressive strings:
const greeting = name => { return `Hello ${name}` }
// They are more expressive:
const greeting = ({firstName, lastName}) => { return `Hello ${firstName} ${lastName}` }
const greeting = ({firstName, lastName}) => `Hello ${firstName} ${lastName}`
```

------------------

## 3. Objects

### Inline Methods/Functions - 4 methods

```js
const numberMethods = {
// Pick one syntax/technique:
  one: function() { return 1; },
  one() { return 1; },
  one = () => { return 1; },
  one = () => 1,
}

numberMethods.one() //=> 1
```

### Class Methods/Functions - 4 methods

```js
class NumberMethods {
  constructor() {
    // often needed
  },
// **Pick one syntax/technique:**
  one: function() { return 1; },
  one() { return 1; },
  one = () => { return 1; },
  one = () => 1,
}

const nm = new NumberMethods()
nm.one() //=> 1
```


-------------------



## 4. Promises Are Awesome!


### 4.1. Promise Basics
```js
// Make *anything* a promise. (Why? This will come in handy... Read on!)
const one = Promise.resolve(1)
// Print value
one.then(n => console.log(n))  //=> 1
// Print value - without arrow function - `console.log` is a function itself
one.then(console.log)          //=> 1
```

### 4.2. Use Existing Functions

```js
// Convert temps: C to F
// (C * 1.8) + 32 = F

const add32 =         n => 32 + n
const add80Percent =  x => x * 1.8

function toFahrenheit(c) {
  return Promise.resolve(c) // Convert arg to a promise
    .then(Number)           // Ensure a number type (`parseFloat` could also be used)
    .then(add80Percent)     // Add 80%
    .then(add32)            // Add 32
} 

toFahrenheit(10)
   .then(console.log) //=> 50
```

### 4.3. Seeing inside the chain

> Debugging tricks:

```js
// log the result in a promise chain **without** changing the result
const echo = prefix => input => {
  console.log(prefix, input)
  return input
}

// Usage
let num = Promise.resolve(5)
  .then(echo('After .resolve:'))   //=> After .resolve: 5
  .then(n => n * n)
  .then(echo('End of the chain:')) //=> End of the chain: 25

num.then(console.log) //=> 25

let boil = toFahrenheit(100)
   .then(echo('F:'))   //=> F: 212
// `echo` Doesn't change/consume the promise chain output
boil.then(console.log) //=> 212
```

### 4.4. Util Methods

> Currently includes `PromiseParts`, and `thenIf` (*Advanced Shit*)

> 1. PromiseParts

```js
// Instead of using Promise constructor syntax: `new Promise((resolve, reject) => { /*  */ })`
// Here's a useful util method:
export function PromiseParts() {
  let resolve = null, reject = null;
  const promise = new Promise((ya, na) => { resolve = ya; reject = na; })
  return {promise, resolve, reject} // Hoist up the promise parts
}
```

> 2. `thenIf` - \*Advanced

**Implementation**

```js
function thenIf(cond = (x) => x, ifTrue = (x) => x, ifFalse = () => null) {
 return value => Promise.resolve(cond(value))
   .then(ans => ans ? ifTrue(value) : ifFalse(value))
}
```

**Usage**

```js
// Usage Example #1:
const ensureDirectory = (file) => Promise
  .resolve(file)                  // 1. Path gets passed in
  .then(thenIf(fs.existsAsync, 
    console.log, fs.mkdirAsync))  // 2. `thenIf` passes path to existsAsync function, and if false, creates
  .then(() => file)               // 3. Return the input variable `file`

// Usage Example #2:
const checkEmail = email => Promise
  .resolve(email)
  .then(thenIf(
    e => e.length > 5,              // Conditional
    e => console.log('Valid:', e),  // ifTrue
    e => console.error('Bad:', e))  // ifFalse
  )
checkEmail('123456@abc.com')  //=> 'Valid: 123456@abc.com'
checkEmail('1@a')             //=> 'Bad: 1@a'

// Usage Example #3:
const checkEmail = email => Promise
  .resolve(email)
  .then(thenIf(e => e.length > 5)) // Note: > 5 is not a complete email check :)
checkEmail('123456@abc.com') //=> '123456@abc.com'
checkEmail('1@a')            //=> null
```



### 4.5. Errors

#### Error Short-hand

```js
// 2 Identical Techniques:

// Option #1: Standard .catch:
.catch(err => {
  console.error('Email Invalid:', err);
})
  
// Option #2: Tighter .catch:
.catch(console.error.bind(console, 'Email Invalid:'))
```


#### Real-world `.catch` pattern

> Includes a # of retries - handled in `supportEmail`'s `.catch`. Find `retries` or the check for 'Network or DNS' errors.

```js
// Returns the input email if it's valid - throws error if not
function validEmail(email) {
  if (!/^[^\s]*@[^\s]*$/.test(email)) {
    throw new Error('Invalid Looking Email: ' + email)
  }
  return email
}

// Placeholder email function
function sendEmail({subject, message, toAddr, fromAddr}) {
  throw new Error('TODO: Implement an email library')
}

// Send an email to support, handling errors
function supportEmail({email, message, toAddr, fromAddr, retries = 0}) {
  return validEmail(email)
  .catch(err => {
    console.error('Email Invalid:', err);
  })
  .then(email => sendEmail({subject: 'Alert', toAddr: 'support@example.com', fromAddr: email, message}))
  .then(result => {
    if (!result.success) {
      throw new Error('Network or DNS error.')
    }
    return result
  })
  .catch(err => {
    // error 
    if (/Network or DNS/.test(err.message)) {
      // Retry sending - recursive promise example
      if (retries > 2) { throw new Error('Too many retries! Cannot send!'); }
      retries = retries + 1
      return supportEmail({email, message, toAddr, fromAddr, retries});
      // Soak in the last few ines... Take as long as you need.
    }
    
    console.error('Email Delivery Failed:', err)
  })
}
```

### 4.6. Getting Up Close & Personal

> How do you make a traditional nodejs callback into a promise? It's just a few lines of code. 
(Note: This pattern is now in Node's native `util` package. Also available in many popular NPM packages, see bluebird's Promisification)

> Here's what Promisification usage looks like, implementation to follow:

**Usage**

```js
// Promisifying Callbacks:
const fs = require('fs')
const readFile = Promisify(fs.readFile)
let fileData = readFile(__dirname + '/index.js', 'utf8')
// Now `.then` the value
fileData.then(contents => console.log('File Contents:', contents))
```

**Implementation**

```js
// Example `PromiseParts()` is used in the Promisify below:
export function Promisify(fn) {
  return (...args) => {
    const {promise, resolve, reject} = PromiseParts();
    // Here's where the callback-style argument list gets assembled
    const cbArgs = [...args, (result, err) => {
      if (err) { return reject(err); }
      resolve(result);
    }]
    // Now call into `fn` with the cbArgs
    fn.apply(this, cbArgs);
  }
}

```
