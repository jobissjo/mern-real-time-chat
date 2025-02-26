import Chat from "../models/chat.js";
import Message from "../models/message.js";


const sendMessage = async (req, res) => {
    try{
        const newMessage =  new Message(req.body);
        const savedMessage = await newMessage.save();


        const chat = await Chat.findOneAndUpdate({_id: req.body.chatId}, 
            {
            lastMessage: savedMessage._id,
            $inc: {unreadMessageCount: 1}}
        )
        console.log(chat);

        res.status(201).send({
            "message": "Message send successfully",
            "data": savedMessage
        })

    }catch (err) {
        res.status(400).send({message: err.message});
    }
}

const getAllMessages = async (req, res)=> {
    try {
        const allMessages = await Message.find({chatId: req.params.chatId})
                .sort({createdAt: 1})
        res.status(200).send({"message": "Messages fetched successfully", 
            data: allMessages
        })
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
}

export {getAllMessages,  sendMessage};
