/* credit: https://github.com/justsml/guides/tree/master/express/setup-guide

install: `npm install express cors morgan helmet nodemon @types/express @types/node`  */
import express, { Request, Response, NextFunction } from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import CatRouter from './modules/cats/router'

const logMode = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'

export default express()
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(morgan(logMode))
//.use(cors({origin: true, credentials: true})) // Use only if you need CORS

// TODO: ⬇️ Add your routes here! ⬇️
  .use('/api/cat', CatRouter)
// The following 2 `app.use`'s MUST be last
  .use(notFoundHandler)
  .use(errorHandler)

function notFoundHandler(request: Request, response: Response) {
  response.status(404)
    .send({error: 'Not found!', status: 404, url: request.originalUrl})
}

function errorHandler(error, request: Request, response: Response, next: NextFunction) {
  console.error('ERROR', error)
  const stack = process.env.NODE_ENV !== 'production' ? error.stack : undefined
  response.status(Number.isInteger(error?.status) ? error?.status : 500)
    .send({error: error.message, stack, url: request.originalUrl})
}
