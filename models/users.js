import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    profilePic: {
        type: String,
        required: false
    },
    friends: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: false
            }
        ]
    }
}, {timestamps: true})

export default mongoose.model('users', userSchema)