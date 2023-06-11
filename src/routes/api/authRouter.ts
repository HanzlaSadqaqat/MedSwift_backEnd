import express, { Request, Response } from 'express'
import { AuthController } from '../../controllers/auth'
import { signUpValidation, loginValidation } from '../../utils/authValidation'
import { LoginResponse, SignupResponse } from 'src/models/User'
// import User from '../../models/User'
// import * as bcrypt from 'bcrypt'
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
    return res.status(err.code).send(err.message)
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
    return res.status(404).send('invalid login Details')
  }
})

export default authRouter
