import ChatRoom from "../models/chatRoom"

const createChatRoom = async (data: any) => {
  return await ChatRoom.save(data)
}

//get all
const getAll = async () => {
  return await ChatRoom.find()
}

//return one by
const findOneBy = async (matricule: string) => {
  return await ChatRoom.findOneBy({
    collaboratorMatricule: matricule,
  })
}

const findOneById = async (id: number) => {
  return await ChatRoom.findOneBy({
    id: id,
  })
}

export { createChatRoom, getAll, findOneBy, findOneById }
