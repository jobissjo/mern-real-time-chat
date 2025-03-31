import mongoose from "mongoose";

const clearedChatsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats",
        required: true
    },
    clearedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("clearedChats", clearedChatsSchema);
