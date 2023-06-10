import Joi from 'joi'
// import { PassThrough } from 'stream'

export const signUpValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(18)
  }).validate(data)

export const loginValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(18)
  }).validate(data)
