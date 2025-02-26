import { clearUnreadMsg, createNewChat, getAllChats } from "../services/chatService.js";



const createNewChatController = async (req, res) => {
    try {
        const chat = await createNewChat(req.body)
        res.status(201).send({
            message: "Chat created successfully",
            data: chat
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const getAllChatsController =  async (req, res) => {
    try {
        const allChats = await getAllChats(req.body)
        res.send({
            message: "Chat details fetched successfully",
            data: allChats
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const clearUnreadMsgController = async (req, res)=> { 
    try{
        
        const updatedChat = await clearUnreadMsg(req.body)
        res.status(200).send({
            message: "Unread messages cleared successfully",
            data: updatedChat
        })

    }catch (error) {
        res.status(400).send({
            message: error.message,

        })
    }
}

export {clearUnreadMsgController, getAllChatsController, createNewChatController}