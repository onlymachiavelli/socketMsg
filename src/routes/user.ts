import { Router } from "express"

import { getAllUsers } from "../handlers/admin"
const userRouter = Router()

userRouter.get("/", getAllUsers)

export default userRouter
