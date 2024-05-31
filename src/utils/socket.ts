const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:4200", // typical angular port
  },
})

const SocketSendMessage = (msg: any) => {
  io.on("connection", (socket: any) => {
    console.log("User connected")
    socket.on("message", (msg: any) => {
      console.log("message: " + msg)
      io.emit("message", msg)
    })
  })
}

export { SocketSendMessage }
