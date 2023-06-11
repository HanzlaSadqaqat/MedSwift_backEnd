import express from 'express'
import validateAccessToken from '../../middleware/authenticateToken'
import { sessionController } from '../../controllers/session'

let controller = new sessionController()

let sessionRouter = express.Router()

sessionRouter.get('/', validateAccessToken, async (req, res) => {
  try {
    let matchUser = await controller.getSessionInfo(req.user?.email, req.user?._id)
    console.log(matchUser)

    return res.send(matchUser)
  } catch (err) {
    return res.status(403).send(err.message)
  }
})

export default sessionRouter
