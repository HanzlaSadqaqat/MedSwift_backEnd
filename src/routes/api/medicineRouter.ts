import express, { Request, Response } from 'express'
import { medicineController } from '../../controllers/medicine'
import { medicineInfoValidation } from '../../utils/medicineValidation'
import { MedicineResponse } from 'src/models/Medicine'

const medicineRouter = express.Router()
const controller = new medicineController()

medicineRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { error, value: body } = medicineInfoValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)
    const response: MedicineResponse = await controller.getMedicinesInfo(
      body.name,
      body.description,
      body.weight,
      body.expireDate,
      body.dosageInstructions,
      body.availability,
      body.price,
      body.quantity
    )
    console.log(response)
    return res.status(200).send(response)
  } catch (error) {
    return res.status(error.code || 403).send(error.message)
  }
})

export default medicineRouter
