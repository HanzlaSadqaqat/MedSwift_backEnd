import mongoose, { Document, Model } from 'mongoose'
let schema = mongoose.Schema

enum role {
  BUYER = 'BUYER',
  SELLER = 'SELLER'
}
export interface UserDocument extends SignupPayload, Document {
  token: string
  verified: boolean
  verificationCode: string
  conformPassword: string
  role: role
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload extends LoginPayload {
  name: string
}

export interface SignupResponse {
  code: number
  message: string
}
export interface verificationPayload {
  verificationCode: string
  message: string
}

export interface LoginResponse extends SignupResponse {
  refreshToken: string
  accessToken: string
}
export interface SessionResponse {
  _id: string
  name: string
  email: string
}
export interface sendEmailDetail {
  email: string
  subject: string
  text?: string
  html?: string
}

export interface verifyResponse {
  message: string
  code: number
}
export interface sendEmailPayload {
  email: string
}
export interface sendEmailResponse {
  code: number
  message: string
}

const userSchema = new schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  verified: { type: Boolean },
  verificationCode: { type: String },
  role: { type: String, enum: role, default: role.BUYER }
})

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export default User
