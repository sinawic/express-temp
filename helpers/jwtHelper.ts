import jwt from 'jsonwebtoken'
import { getRequesterSupporter } from '../repositories/supporter'
import { ISupporter } from './../types'

const genJWTtoken = (data: ISupporter, exp = Math.floor(Date.now() / 1000) + (60 * 60 * 60)) => {
  return jwt.sign({ data, exp }, process.env.ACCESS_TOKEN_SECRET || 'secret')
}

const verifyJWTtoken = async (token: string) => {
  return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret', async (err, user) => {
    if (err) {
      console.log(err)
      throw new Error("Unauthorized")
    }

    const s = getRequesterSupporter(user)
    if (!s) throw new Error("Unauthorized")

    return s
  })
}

export { genJWTtoken, verifyJWTtoken }