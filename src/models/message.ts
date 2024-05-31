import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm"
import ChatRoom from "./chatRoom"

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  message: string

  @Column()
  date: Date

  @Column()
  sender: string //either "admin" or "collaborateur"

  @Column()
  senderAlias: string

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRoom: ChatRoom

  @Column()
  sentAt: Date
}

export default Message
