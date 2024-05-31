interface SendMessage {
  message: string
  senderAlias: string //either "admin" or "collaborateur"
  chatRoomId: number
  target: string | null //matricule of collaborator  .
}

//send admin
interface SendByAdmin {
  message: string
  chatRoomId: number | null
  target: string | null
}

//send collaborator

interface SendByCollaborator {
  message: string
  chatRoomId: number | null
}
export type { SendMessage, SendByAdmin, SendByCollaborator }
