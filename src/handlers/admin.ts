import * as UserServices from "../services/user"
import { RequestHandler } from "express"

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const data: any = await UserServices.getAll()
    res.status(200).json(data)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export { getAllUsers }
