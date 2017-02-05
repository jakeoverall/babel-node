import env from './env'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { defaultErrorHandler, corsOptions } from './handlers'
import routes from './routes'

let server = express()

console.log(defaultErrorHandler)

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/', express.static(`${__dirname}/public/`));
server.use('/api', cors(corsOptions), routes.router)
server.use('/', defaultErrorHandler)

export default server