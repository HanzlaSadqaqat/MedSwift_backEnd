import { jwtInfo } from '../types/infoJWT'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (info: jwtInfo) =>
  jwt.sign(info, process.env.SECRET_KEY as string, {
    expiresIn: '1h'
  })
