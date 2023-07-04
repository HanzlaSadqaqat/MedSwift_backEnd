import express, { Request, Response } from 'express'
import { AuthController } from '../../controllers/auth'
import { signUpValidation, loginValidation, verifyValidation, sendEmailValidation } from '../../utils/authValidation'
import { LoginResponse, SignupResponse, sendEmailResponse, verifyResponse } from '../../models/User'

const authRouter = express.Router()

const controller = new AuthController()

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = signUpValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)

    const response: SignupResponse = await controller.signup(body.name, body.email, body.password, body.conformPassword, body.role)

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
authRouter.post('/send/verification', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = sendEmailValidation(req.body)
    if (error) res.status(403).send(error.details[0].message)
    const response: sendEmailResponse = await controller.sendEmail(body.email)
    return res.status(response.code).send(response.message)
  } catch (error) {
    return res.status(error.code).send(error.message)
  }
})
authRouter.post('/email/verify', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = verifyValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const response: verifyResponse = await controller.verifyEmail(body.email, body.verificationCode)
    console.log(response)
    return res.status(response.code).send(response)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})

export default authRouter
