import { RequestHandler } from "express"
import ChatRoom from "../models/chatRoom"
import User from "../models/user"
import { getAll } from "../services/chatroom"
import { SocketSendMessage } from "./../utils/socket"

//get users

const getAllRooms: RequestHandler = async (req, res) => {
  //sub
  const sub = req.body.sub
  console.log({ sub })
  if (!sub) {
    return res.status(401).json({ message: "Token is required" })
  }

  //find
  let user: any
  try {
    user = await User.findOneBy({
      matricule: sub,
    })
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  if ((user.role as string) !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "You are not allowed to send a message" })
  }

  //find all chatrooms
  let chatRooms: any
  try {
    chatRooms = await getAll()

    //get all the users in the chatrooms
    for (let i = 0; i < chatRooms.length; i++) {
      let users
      try {
        users = await User.findOneBy({
          matricule: chatRooms[i].matricule,
        })
      } catch (e: any) {
        return res.status(500).json({ message: e.message })
      }
      chatRooms[i].users = users
    }
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }

  return res.status(200).json(chatRooms)
}

export { getAllRooms }
