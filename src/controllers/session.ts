import User from '../models/User'

export class sessionController {
  getSessionInfo = async (email: any, _id: any) => {
    let existingUser = await User.findOne({ email })
    if (!existingUser) throw { code: 403, message: 'User Does not exist' }

    let newUser = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email
    }

    return newUser
  }
}
