import logger from "../config/loggerConfig.js";
import { getAllMsgs, sendMsg } from "../services/messageService.js";


const sendMessage = async (req, res) => {
    try{
        const savedMessage = await sendMsg(req.body)
        res.status(201).send({
            "message": "Message send successfully",
            "data": savedMessage
        })

    }catch (err) {
        logger.info(err)
        res.status(400).send({message: err.message});
    }
}

const getAllMessages = async (req, res)=> {
    try {
        const chatId = req.params.chatId;
        const allMessages = await getAllMsgs(chatId);
        res.status(200).send({"message": "Messages fetched successfully", 
            data: allMessages
        })
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
}

export {getAllMessages,  sendMessage};
