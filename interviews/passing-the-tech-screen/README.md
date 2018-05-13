# Tech Screen Interview Questions

## CSS

1. What are CSS selectors?

> Named keys used to label parts of your HTML, provide ways to select (`querySelectorAll`) nodes, and ease styling.

1. What is the specificity of those selectors?

> Overspecificity is `input[type="text"].username` vs. the minimal `.username`

1. What is the difference between `.class1.class2` and `.class1 .class2` as a selector?

> Without a space it will match elements with both classes.
> With a space, it selects children of `.class1` with class `.class2`. 

1. How do you center something in CSS?

> "Haha, nice trick question!" Many a meme has made fun of this. 
> Centering in CSS was comically difficult for many years, recently the situation has improved with more widespread flexbox and grid support.

1. How do floats work?

> Voodoo positioning. Seriously though, I think 

1. How do you get something to not display using CSS?

> **A couple ways:**
> 1. `display: none/inline,block,etc`
> 1. `visibility: hidden/visible`
> 1. `opacity: 0/100%`
> 1. and I'm sure there's other crazy tricks out there.

1. Why would you use Flexbox or CSS Grid?

> When I'm scaffolding the structure of components or entire pages. They provide a concise, precise and powerful way to describe various layouts (column, app, etc).

## JavaScript

1. What are `let` and `const`?
> They ensure variables can only be created once per block scope. (block scope: fancy way of saying 'pairs of curly-braces'). 
> Global `const`'s do not become properties of the `window` object, unlike `var` variables. 

1. What is `var`?
> The OG of JS variable declaration.

1. How is `var` different than `let`?
>  `let`'s scope is it's enclosing curly-brace block - wherever it was defined (e.g. `if/else`, `function`, `for`, `for in/of`, `while`, `do`, `{curly braced section/block}`). It can only be used once in each block.
> `var` has looser rules, it's scope is the function (or global scope) where it is declared. Re-declaring a `var` simply overrides the value for that variable name for future references.

1. What are anonymous functions?
> Functions without a name.

1. How do you define a global variable?
1. How do you define a global variable inside of a function?
1. What does IIFE (pronounced iffy) mean?
1. What's a closure?
1. How does event bubbling work?
1. How do you avoid event bubbling?
1. What is the difference between `==` and `===`?
1. What is the difference between `null` and `undefined`?
1. What are the primitive data types?

## React:

1. What is the one lifecycle hook that is in every class component?
1. Name as many lifecycle hooks as you can?
    1. Bonus: Name the deprecated hooks.
1. What is the difference between state and props?
1. Can you set state more than once?
1. How does React use the virtual DOM?
1. What are the benefits of `css-in-js`?
1. When would you use Redux and `this.setState({...})`?
1. Why do we typically need to use babel?
1. What problem(s) does `Redux` solve?


---------------

> Credit: Primary Source: Actual Interviews

