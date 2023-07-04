import mongoose, { Date, Document, Model, Schema, Types } from 'mongoose'
// import { UserDocument } from './User'

const schema = mongoose.Schema

export interface MedicineDocument extends Document {
  name: string
  description: string
  weight: string
  expireDate: Date
  dosageInstructions: string
  availability: boolean
  price: number
  quantity: number
  user: Types.ObjectId
}
export interface MedicineResponse {
  code: number
  message: string
}

const medicineSchema = new schema<MedicineDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: String },
  expireDate: { type: Date, default: Date.now, required: true },
  dosageInstructions: { type: String, required: true },
  availability: { type: Boolean, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
const Medicine: Model<MedicineDocument> = mongoose.model<MedicineDocument>('Medicine', medicineSchema)
export default Medicine
