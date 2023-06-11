import User, { LoginResponse, SignupResponse, UserDocument } from '../models/User'
import * as bcrypt from 'bcrypt'
import { generateAccessToken } from '../utils/generateAccessToken'
import { Example, FormField, Post, Route, Tags } from 'tsoa'
import { LoginExample, signupExample } from './Examples/authExamples'
import { generateRefreshToken } from '../utils/generateRefreshToken'

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

    //create new user
    let newUser: UserDocument = new User({ name: name, email: email, password: hashPassword })

    //save user in database
    let token: string = generateAccessToken({ email: newUser.email, id: newUser._id })
    if (!token)
      throw {
        code: 403,
        message: 'Token not generated'
      }
    newUser.token = token
    await newUser.save()
    // generate token in signup function

    return {
      code: 200,
      accessToken: token,
      message: 'User Created Successfully'
    }
  }

  @Post('/login')
  @Example<LoginResponse>(LoginExample)
  async login(@FormField() email, @FormField() password): Promise<LoginResponse> {
    let existingUser: any = await User.findOne({ email })
    let isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch)
      throw {
        code: 403,
        message: 'invalid'
      }
    // //login token generate
    let accessToken: string = generateAccessToken({ email: existingUser.email, id: existingUser._id })
    let refreshToken: string = generateRefreshToken({ email: existingUser.email, id: existingUser._id })

    return {
      code: 200,
      accessToken,
      refreshToken,
      message: 'You login successfully'
    }
  }
}
