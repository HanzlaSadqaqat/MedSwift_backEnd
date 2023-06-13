import Joi from 'joi'
import { LoginPayload, SignupPayload, verifyResponse } from '../models/User'
// import { PassThrough } from 'stream'

export const signUpValidation = (data: SignupPayload): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(18)
  }).validate(data)

export const loginValidation = (data: LoginPayload): Joi.ValidationResult =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(18)
  }).validate(data)

export const verifyValidation = (data: verifyResponse): Joi.ValidationResult =>
  Joi.object({
    verificationCode: Joi.string().length(6),
    email: Joi.string().email().required()
  }).validate(data)
