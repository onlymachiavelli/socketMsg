import { io } from "../../app"
const SocketSendMessage = (msg: any) => {
  // console.log("attempt")
  // io.on("connection", (socket: any) => {
  console.log("yeaa buddy sendiiiing")
  //emit a message
  io.emit("message", msg)
  // })
}

export { SocketSendMessage }
