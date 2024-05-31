import ChatRoom from "../models/chatRoom"
import Message from "../models/message"
import User from "../models/user"
import { SendMessage, SendByAdmin, SendByCollaborator } from "../types/send"
import { findByMatricule } from "../services/user"
import { RequestHandler } from "express"
import { getMessagesByChatRoomId, saveMessage } from "./../services/messages"
import {
  createChatRoom,
  getAll,
  findOneBy,
  findOneById,
} from "../services/chatroom"
const SendMessageTextByCol: RequestHandler = async (req, res) => {
  //sub
  const sub = req.body.sub

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

  console.log({
    user: user,
  })

  if ((user.role as string) !== "COLLABORATEUR") {
    return res
      .status(403)
      .json({ message: "You are not allowed to send a message" })
  }

  //find a chatroom

  let chatRoom: any
  try {
    chatRoom = await findOneBy(user.matricule)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }

  if (!chatRoom) {
    //create chatroom
    try {
      const chatRow: any = new ChatRoom()
      chatRow.collaboratorMatricule = user.matricule

      await createChatRoom(chatRow)
    } catch (e: any) {
      return res.status(500).json({ message: e.message })
    }
  }

  //find again
  try {
    chatRoom = await findOneBy(user.matricule)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }

  const bodyMessage: SendByCollaborator = {
    message: req.body.message,
    chatRoomId: chatRoom.id,
  }

  //send message
  const message = new Message()
  message.message = bodyMessage.message
  message.chatRoom = chatRoom
  message.senderAlias = "collaborator"
  message.sender = sub
  message.sentAt = new Date()

  try {
    await saveMessage(message)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
  return res.status(201).json({ message: "Message sent" })
}

//get his convo with admins
const getMyConvo: RequestHandler = async (req, res) => {
  //sub
  const sub = req.body.sub
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

  if ((user.role as string) !== "COLLABORATEUR") {
    return res
      .status(403)
      .json({ message: "You are not allowed to send a message" })
  }

  //find a chatroom

  let chatRoom: any
  try {
    chatRoom = await findOneBy(user.matricule)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }

  //messages

  let messages: any = []
  try {
    messages = await getMessagesByChatRoomId(chatRoom)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }

  return res.status(200).json(messages)
}

export { SendMessageTextByCol, getMyConvo }
