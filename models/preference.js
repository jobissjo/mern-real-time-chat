import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isDarkMode: {
        type: Boolean,
        default: false
    },
    isNotification: {
        type: Boolean,
        default: true
    },
    language: {
        type: String,
        default: "en"
    }
}, {timestamps: true})

export default mongoose.model("preferences", preferenceSchema);