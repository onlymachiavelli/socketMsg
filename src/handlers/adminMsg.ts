import ChatRoom from "../models/chatRoom"
import Message from "../models/message"
import User from "../models/user"
import { SendMessage, SendByAdmin, SendByCollaborator } from "../types/send"
import { findByMatricule } from "../services/user"
import { RequestHandler } from "express"

const SendMessage : RequestHandler = async(req, res) =>{
    
}