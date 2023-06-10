import express from 'express'
import authRouter from './authRouter'
import sessionRouter from './sessionRouter'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/session', sessionRouter)

export default router
