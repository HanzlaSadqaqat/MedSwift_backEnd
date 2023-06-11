import mongoose, { Document, Model } from 'mongoose'
let schema = mongoose.Schema

export interface UserDocument extends SignupPayload, Document {
  token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload extends LoginPayload {
  name: string
}

export interface SignupResponse {
  accessToken: string
  code: number
  message: string
}

export interface LoginResponse extends SignupResponse {
  refreshToken: string
}
export interface SessionResponse {
  _id: string
  name: string
  email: string
}

let userSchema = new schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true }
})

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export default User
