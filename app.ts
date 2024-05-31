import express from "express"
import "dotenv/config"

import appDataSource from "./src/utils/connect"
import { json } from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import chatRoomRouter from "./src/routes/chatroom"

import userRouter from "./src/routes/user"
import msgRouter from "./src/routes/messages"

const app = express()
app.use(json())

app.use(cors())

const port = process.env.PORT

//col
let t1: string = "12227"

//generate token
const token = jwt.sign({ sub: t1 }, process.env.SECRET as string, {
  expiresIn: "7d",
})
console.log("Token : col", token)
//ad
let t2: string = "9876"

const token2 = jwt.sign({ sub: t2 }, process.env.SECRET as string, {
  expiresIn: "7d",
})

console.log("Token : ad", token2)

appDataSource.initialize().then((r) => {
  console.log("Connected to database")
  app
    .listen(port, () => {
      console.log(`Server started at http://localhost:${port}`)
      app.use("/user", userRouter)
      app.use("/chatroom", chatRoomRouter)
      app.use("/messages", msgRouter)
    })
    .on("error", (e) => {
      console.log("Error starting server, error : => ", e)
    })
})
