import User, { LoginResponse, SignupResponse, UserDocument, verifyResponse } from '../models/User'
import * as bcrypt from 'bcrypt'
import { generateAccessToken } from '../utils/generateAccessToken'
import { Example, FormField, Post, Route, Tags } from 'tsoa'
import { LoginExample, signupExample, verificationExample } from './Examples/authExamples'
import { generateRefreshToken } from '../utils/generateRefreshToken'
import { sendEmail } from '../utils/sendEmail'
import randomstring from 'randomstring'

@Route('api/auth')
@Tags('Auth')
export class AuthController {
  @Post('/signup')
  @Example<SignupResponse>(signupExample)
  async signup(@FormField() name, @FormField() email, @FormField() password): Promise<SignupResponse> {
    let existingUser: UserDocument | null = await User.findOne({ email })
    if (existingUser) {
      throw {
        code: 403,
        message: 'User Already Exists'
      }
    }

    //create hash of your password
    let hashPassword = await bcrypt.hash(password, 10)

    console.log('password hashed')

    //create new user
    let newUser: UserDocument = new User({ name: name, email: email, password: hashPassword })

    newUser.verified = false
    let subject = 'Email Verification'
    const verificationCode = randomstring
      .generate({
        length: 6,
        charset: 'numeric'
      })
      .toString()
    const html = `<p>Your Verification Code is: <strong>${verificationCode}</strong></p>`
    await sendEmail({ email: newUser.email, subject, html })
    newUser.verificationCode = verificationCode
    await newUser.save()
    // generate token in signup function

    return {
      code: 200,
      message: 'User Created Successfully'
    }
  }

  @Post('/login')
  @Example<LoginResponse>(LoginExample)
  async login(@FormField() email, @FormField() password): Promise<LoginResponse> {
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw {
        code: 403,
        message: 'invalid Login Details'
      }
    }
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch)
      throw {
        code: 403,
        message: 'invalid Login Details'
      }

    //login token generate

    if (existingUser.verified === false)
      throw {
        code: 400,
        message: 'Please Verify Your Email Account!'
      }
    let accessToken: string = generateAccessToken({ email: existingUser.email, id: existingUser._id })
    let refreshToken: string = generateRefreshToken({ email: existingUser.email, id: existingUser._id })
    return {
      code: 200,
      accessToken,
      refreshToken,
      message: 'You login successfully'
    }
  }
  @Post('/email/verify')
  @Example<verifyResponse>(verificationExample)
  async verifyEmail(@FormField() email: string, @FormField() verificationCode: string) {
    console.log(email)
    console.log(verificationCode)
    let user = await User.findOne({ email })
    if (!user)
      throw {
        code: 403,
        message: 'Invalid Details'
      }
    if (user.verificationCode === verificationCode) {
      user.verified = true
      await user.save()
      return {
        code: 200,
        message: 'Your Code verified successfully'
      }
    }
    return {
      code: 403,
      message: 'Invalid Code'
    }
  }
}
