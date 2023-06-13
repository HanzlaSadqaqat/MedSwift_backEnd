import express, { Request, Response } from 'express'
import { AuthController } from '../../controllers/auth'
import { signUpValidation, loginValidation, verifyValidation } from '../../utils/authValidation'
import { LoginResponse, SignupResponse, verifyResponse } from '../../models/User'

const authRouter = express.Router()

const controller = new AuthController()

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { error, value: body } = signUpValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)
    const response: SignupResponse = await controller.signup(body.name, body.email, body.password)
    console.log(response)

    return res.status(200).send(response)
  } catch (err) {
    return res.status(err.code || 403).send(err.message)
  }
})
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    let { error, value: body } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let response: LoginResponse = await controller.login(body.email, body.password)

    return res.status(200).send(response)
  } catch (err) {
    console.log(err.message)
    return res.status(err.code || 403).send(err.message)
  }
})
authRouter.post('/email/verify', async (req: Request, res: Response) => {
  try {
    let { error, value: body } = verifyValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let response: verifyResponse = await controller.verifyEmail(body.email, body.verificationCode)
    console.log(response)
    return res.status(200).send(response)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})

export default authRouter
