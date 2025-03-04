import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notificationType: {
        type: String,
        ref: "notificationTypes",
        enum: ["friendRequest", "other"],
        default: "other",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("notifications", notificationSchema)