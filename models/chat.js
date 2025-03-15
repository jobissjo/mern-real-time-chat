import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true
            }
        ]
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    },
    unreadMessageCount: {
        type: Number,
        default: 0
    },
    clearedChatAt: {
        type: Date,
        default: null
    },
    encryptedKey: {
        type: String,
        default: null
    },
    blocked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("chats", chatSchema)