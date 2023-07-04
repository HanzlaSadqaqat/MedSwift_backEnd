import { MedicineDocument } from 'src/models/Medicine'
import Joi from 'joi'

export const medicineInfoValidation = (data: MedicineDocument): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    weight: Joi.string(),
    expireDate: Joi.date().required(),
    dosageInstructions: Joi.string().required(),
    availability: Joi.boolean().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  }).validate(data)
