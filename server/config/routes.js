import express from 'express'
import multer from 'multer'
import axios from 'axios'
import { userRoutes } from '../modules/users/user.routes'
import { authRoutes } from '../modules/auth/auth.routes'
import { positionRoutes } from '../modules/position/position.routes'
import { httpStatus } from '../utils/httpStatus'
import { diskStorage, limits, s3Storage, imageFileFilter } from '../utils/fileupload'
import { commonRoutes } from '../modules/common/common.routes'
const Router = express.Router()

Router.all('/health-check', (req, res) => {
  console.log('API /health-check')
  return res.json({ message: 'OK' })
})
Router.all('/keepalive', async (req, res) => {
  var origin = req.connection.remoteAddress
  console.log('API /keepalive', origin, req.ip)
  try {
    req.query.url && await axios.get(req.query.url)
    // console.log('keepalive res', res1.data)
  } catch (error) {
    console.log('keepalive error', JSON.stringify(error))
  }
  return res.json({ message: 'OK' })
})

Router.use('/users', userRoutes)
Router.use('/auth', authRoutes)
Router.use('/msc', commonRoutes)
Router.use('/position', positionRoutes)

Router.post('/fileupload', multer({ storage: diskStorage, limits, fileFilter: imageFileFilter }).single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})

Router.post('/s3fileupload', multer({ storage: s3Storage, limits, fileFilter: imageFileFilter }).single('avatar'), (req, res) => {
  if (!req.file) return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Please select file' })
  return res.json({ data: req.file })
})

export { Router }
