import mongoose, { Document, Model } from 'mongoose'
let schema = mongoose.Schema

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  token: string
}

let userSchema = new schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true }
})

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export default User
