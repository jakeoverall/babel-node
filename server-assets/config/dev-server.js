import env from './env'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { defaultErrorHandler, corsOptions } from './handlers'
import api from '../models'
// ENABLE ROUTES IF USING SERVER SIDE ROUTING
// import routes from './routes'

let server = express()

function logger(req, res, next) {
  console.log('INCOMING REQUEST', req.url)
  next()
}

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('', logger)
server.use('/', express.static(__dirname + '/../public'));
server.use('/api', cors(corsOptions), api)
server.use('/', defaultErrorHandler)

export default server