import express from 'express'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { common } from './common.controller'

const commonRoutes = express.Router()

commonRoutes.post('/post', asyncWrapper(common.post))
commonRoutes.get('/get', asyncWrapper(common.get))
commonRoutes.get('/cloudinary', asyncWrapper(common.cloudinary))
commonRoutes.post('/twilio', asyncWrapper(common.twilio))

export { commonRoutes }
