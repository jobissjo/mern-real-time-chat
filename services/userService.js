import cloudinary from "../cloudinary.js";
import User from "./../models/users.js";

export const getAllUsersService = async (data)=> {
    return await User.find({_id: {$ne: data.userId}})
}

export const getCurrentLoggedUser = async (data)=> {
    await User.findById(data.userId);
}

export const updateProfilePicture = async (data) => {
    const uploadedImage = await cloudinary.uploader.upload(data.profilePic, {
        folder: 'quick-chat'
    })

    await User.findByIdAndUpdate(
        { _id: data.userId },
        { profilePic: uploadedImage.secure_url },
        { new: true }
    )
}