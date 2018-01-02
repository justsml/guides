/*
In ruby you can check for null with `?` 
e.g. option.answers[0]?.correct

In JS you can avoid this issue in many ways.

The 2 techniques I find most helpful are:
1. Ugly `&&` chain
2. Avoid accessing anything by index! Use Array methods + functions (partial solution)
*/

// Example object:
const submission = {
  studentId: 123,
  answers: [
    {id: 1, correct: true, value: 42},
    {id: 2, correct: true, value: 42},
    {id: 3, correct: true, value: 42},
    {id: 4, correct: false, value: 41},
  ]
}

// Option #1:
var correct = submission && submission.answers && submission.answers[0] && submission.answers[0].correct
// Yikes - but never gets null errors!

// Option #2
// Lets improve this...
// Say we really needed to return the answers which are `correct` 

// Helper functions:
// getAnswers uses an empty object in the destructuring, and when it returns the `answers` key's value it falls back to an empty array
const getAnswers = ({answers} = {}) => answers || []
// getCorrect returns the `.correct` key's value from the obj passed in.
const getCorrect = ({correct}) => correct

// How to put it together:
getAnswers(submission)
  .filter(getCorrect)
// Bazinga!!!!!


// The neat thing about writing little utility functions like `getCorrect` is you can 
// use it in many cool ways:
const firstCorrectAnswer = getAnswers(submission).find(getCorrect) // See MDN [].find docs
const isPerfect = getAnswers(submission).every(getCorrect) // ALWAYS will be true or false
const hasCorrectAnswer = getAnswers(submission).some(getCorrect) // " Short-circuits like find


/*
Now lets say you get an array of submissions, how can we build on our existing code? 
*/
const correctAnswers = submissions.map(submission => getAnswers(submission).filter(getCorrect))

// Score submissions
const scoredSubmissions = submissions.map(submission => {
  const answers = getAnswers(submission)
  const correct = answers.filter(getCorrect)
  // Create a clone/fresh object
  return {...submission, 
    score: correct.length / answers.length // set the score
  }
})

// Okay, next refactor above code like so:
const scoredSubmissions = submissions.map(scoreSubmission)

function scoreSubmission(submission) {
  const answers = getAnswers(submission)
  const correct = answers.filter(getCorrect)
  return {...submission,                   
    score: correct.length / answers.length // set the score
  }
}



