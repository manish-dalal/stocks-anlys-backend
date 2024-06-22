import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'express-jwt'
import helmet from 'helmet'
import { httpStatus } from './utils/httpStatus'
import { AppError } from './utils/appError'
import { secretCallback } from './utils/secretCallback'
import { connectMysql } from './config/mysqlconnect'
import './config/cron'

const app = express()

app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(
  '/api',
  jwt({ secret: secretCallback }).unless({
    path: [
      '/api/health-check',
      '/api/users',
      '/api/auth/login',
      '/api/users/testmysqlroute',
      '/api/fileupload',
      '/api/s3fileupload',
      /\/api\/msc*/,
      '/api/keepalive',
      /\/api\/position*/
    ],
    requestProperty: 'auth'
  })
)
app.use('/api', Router)

// Handle 404
app.use(function (req, res, next) {
  throw new AppError('Resource not found', httpStatus.NOT_FOUND)
})

if (process.env.USE_MONGODB === 'true') connectMongo()
if (process.env.USE_MYSQL === 'true') connectMysql()

app.use(errorHandler)

export { app }
