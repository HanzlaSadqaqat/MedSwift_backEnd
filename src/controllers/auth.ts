import User, { UserDocument } from '../models/User'
import * as bcrypt from 'bcrypt'
import { generateAccessToken } from '../utils/generateAccessToken'
export class AuthController {
  async signup(body: any) {
    let { name, email, password } = body
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
      token: token,
      message: 'User Created Successfully'
    }
  }
  async login(body: any) {
    let { email, password } = body
    let existingUser: any = await User.findOne({ email })
    let isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch)
      throw {
        code: 403,
        message: 'invalid'
      }
    // //login token generate
    let token: string = generateAccessToken({ email: existingUser.email, id: existingUser._id })
    // let token: string = Jwt.sign({ email: existingUser.email, id: existingUser._id }, secrete)

    return {
      code: 200,
      token: token,
      message: 'You login successfully'
    }
  }
}
