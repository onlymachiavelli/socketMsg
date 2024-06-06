import { Router } from "express"
import { getAllRooms, getOneChatRoom } from "../handlers/chatRoom"
import auth from "../middlewares/user"

const chatRoomRouter = Router()

chatRoomRouter.get("/", auth, getAllRooms)

chatRoomRouter.get("/:id", auth, getOneChatRoom)
export default chatRoomRouter
