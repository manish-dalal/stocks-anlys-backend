import express from 'express'
import { positions } from './position.controller'

import { asyncWrapper } from '../../utils/asyncWrapper'

const positionRoutes = express.Router()

positionRoutes.get('/v1/list', asyncWrapper(positions.index))
positionRoutes.post('/v1/', asyncWrapper(positions.create))
positionRoutes.get('/v1/scraping', asyncWrapper(positions.scraping))

export { positionRoutes }
