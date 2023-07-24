import Medicine, { MedicineDocument, uploadImageResponse } from '../models/Medicine'
import { Post, Route, Tags, UploadedFiles, FormField } from 'tsoa'
// import { medicineExample } from './Examples/medicineExample'
import { uploader } from '../utils/s3Utils'
// import cloudinary from '../utils/s3Utils'
// import { dataUri } from '../middleware/multerMiddleware'
// import express, { Request, Response } from 'express'

@Route('api/medicine')
@Tags('Medicine')
export class medicineController {
  @Post('/medicine/upload')
  async getMedicineFile(
    @FormField() name,
    @FormField() description,
    @FormField() weight,
    @FormField() expireDate,
    @FormField() dosageInstructions,
    @FormField() availability,
    @FormField() price,
    @FormField() quantity,
    @UploadedFiles() image: Express.Multer.File[]
  ): Promise<uploadImageResponse | string> {
    const uploadedPromise = await image.map(async (image) => {
      return await uploader.upload(image.path, { upload_preset: 'uploadPictures' })
    })

    const result = await Promise.all(uploadedPromise)
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.log('s3 error: ', error)
        throw {
          code: 401,
          message: 'promise rejected'
        }
      })
    if (!result)
      throw {
        code: 403,
        message: 'invalid image'
      }
    let imageUrl = result.map((result) => result.secure_url)
    const newMedicine: MedicineDocument = new Medicine({
      name,
      description,
      weight,
      expireDate,
      dosageInstructions,
      availability,
      price,
      quantity,
      imageUrl
    })
    await newMedicine.save()
    console.log(newMedicine)
    return {
      code: 200,
      message: 'image uploaded succssfully'
    }
  }
}
