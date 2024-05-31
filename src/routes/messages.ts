import { Router } from "express"
import { SendMessageTextByCol, getMyConvo } from "../handlers/colMsg"
import { SendMessageTextByAdmin, getConvo } from "../handlers/adminMsg"
import auth from "./../middlewares/user"
const msgRouter = Router()

msgRouter.post("/col/send", auth, SendMessageTextByCol)
msgRouter.get("/col", auth, getMyConvo)

msgRouter.post("/admin/send", auth, SendMessageTextByAdmin)
msgRouter.get("/admin/:coll", auth, getConvo)

export default msgRouter
