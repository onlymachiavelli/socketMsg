import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm"
import Message from "./message"

@Entity()
class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  collaboratorMatricule: string

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[]
}

export default ChatRoom
