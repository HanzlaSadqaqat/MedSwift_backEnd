import Medicine, { MedicineDocument, MedicineResponse } from '../models/Medicine'
import { Example, FormField, Post, Route, Tags } from 'tsoa'
import { medicineExample } from './Examples/medicineExample'

// import express, { Request, Response } from 'express'
@Route('api/medicine')
@Tags('Medicine')
export class medicineController {
  @Post('/')
  @Example<MedicineResponse>(medicineExample)
  async getMedicinesInfo(
    @FormField() name,
    @FormField() description,
    @FormField() weight,
    @FormField() expireDate,
    @FormField() dosageInstructions,
    @FormField() availability,
    @FormField() price,
    @FormField() quantity
  ): Promise<MedicineResponse> {
    const newMedicine: MedicineDocument = new Medicine({
      name,
      description,
      weight,
      expireDate,
      dosageInstructions,
      availability,
      price,
      quantity
    })

    await newMedicine.save()
    console.log(newMedicine)
    return { code: 200, message: 'Medicine Save Successfully' }
  }
}
