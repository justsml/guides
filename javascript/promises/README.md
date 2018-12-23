> I've been working on condensing my "rules of thumb" for avoiding Promise issues & improving developer experience:


## Avoiding Promise Foot-guns

* Function Rules To Live By
  * **ALWAYS** `return` - in every sync AND async function.
  * **ALWAYS** use single argument functions.
  * **ALWAYS** limit one async call per function - except when using `Promise.all()` or chaining via `.then()`
  * `return` immediately if possible - makes single-purpose more clear.
  * Prefer named parameters w/ destructuring: `({name, phone = 'none'}) => name + ' ' + phone`
  * Avoid `this` - pass needed data as arguments explicitly. Prevents code which is harder to reason about, and bugs related to calling class methods out of order.

* Error Rules To Live By
  * Make sure you get a call stacks (line numbers) by **ALWAYS** using the Error constructor: either with `new` keyword - `throw new Error('oh no')`. Or `throw Error('oh no')` which will automatically invoke the constructor.
  * 2 key rules for `.catch()`
    * Never forget to use `.catch()` - at least once - usually at the top-most part of your app.
    * Omit in library code - leave error handling to the calling application (or test) code.


##### This list encompasses 95% of the bugs I find in Promise code.

> Using these rules, Promises act as the glue to stick your code together, they let you treat async & sync functions the same. Ultimately your function names help make your code read like a story.

