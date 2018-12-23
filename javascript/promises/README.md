> I've been working on condensing my "rules of thumb" for avoiding Promise issues & improving developer experience:


## Avoiding Promise Foot-guns

### Function Rules To Live By

1. **ALWAYS** `return` - in every sync AND async function.
1. **ALWAYS** use single argument functions.
1. **ALWAYS** limit one async call per function - except when using `Promise.all()` or chaining via `.then()`
1. Your functions should `return` immediately _if possible_ - makes its purpose more clear.
1. Use named parameters w/ destructuring: `({name, phone = 'none'}) => name + ' ' + phone`
1. Avoid `this` - pass needed data as arguments explicitly. `return` a meaningful result. Using `this` creates code which is harder to trace generally. Also it can add an especially tricky angle when writing multi-threaded code.

### Error Rules To Live By

1. Make sure you get a call stack (line numbers) by **ALWAYS** using the Error constructor: either with `new` keyword - `throw new Error('oh no')`. Or `throw Error('oh no')` which will automatically invoke the constructor.
1. 2 key rules for `.catch()`
   * Never forget to use `.catch()` - at least once - usually at the top-most part of your app.
   * Omit in library code - leave error handling to the calling application (or test) code.


##### This list encompasses 95% of the bugs I find in Promise code.

> [Using these rules](https://github.com/justsml/escape-from-callback-mountain/), Promises act as the glue to stick your code together, they let you treat async & sync functions the same. Combine with **named functions to help your [code read like a story](https://github.com/justsml/escape-from-callback-mountain).**



