import { Router } from "express"
import { getAllRooms } from "../handlers/chatRoom"
import auth from "../middlewares/user"

const chatRoomRouter = Router()

chatRoomRouter.get("/", auth, getAllRooms)

export default chatRoomRouter
