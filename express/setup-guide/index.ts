/* credit: https://github.com/justsml/guides/tree/master/express/setup-guide

install: `npm install express cors morgan helmet nodemon @types/express @types/node`  */
import app from './app';

const port = parseInt(process.env.PORT || '3000')
const startMessage = `Started server on http://0.0.0.0:${port}`

app.listen(port)
  .on('error', console.error)
  .on('listening', () => console.log(console, startMessage))
