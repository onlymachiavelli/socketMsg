import Message from "../models/message"

//save message

const saveMessage = async (message: any) => {
  return await message.save()
}

// getMessagesByChatRoomId
const getMessagesByChatRoomId = async (chatRoom: any) => {
  return await Message.findBy({
    chatRoom: chatRoom,
  })
}

export { saveMessage, getMessagesByChatRoomId }
