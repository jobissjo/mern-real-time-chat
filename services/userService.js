import cloudinary from "../cloudinary.js";
import User from "./../models/users.js";

export const getAllUsersService = async (data)=> {
    const currentUser = await User.findById(data.userId).populate("friends");
    const users = await User.find({_id: {$ne: data.userId}});

    const usersWithStatus = await Promise.all(users.map(async (user)=> {
        const isFriend = currentUser.friends.some((friend)=> friend._id.equals(friend._id));
        let latestRequest = null;
        if (isFriend) {
            latestRequest = await User.findOne({
                $or: [
                    { fromUser: data.userId, toUser: user._id },
                    { fromUser: user._id, toUser: data.userId }
                ]
            }).sort({createdAt: -1}).select('status')
        }
        return {...user.toObject(), isFriend, 
            requestStatus: latestRequest ? latestRequest.status : null}
    }))
    
    return usersWithStatus;

}

export const getCurrentLoggedUser = async (data)=> {
    return await User.findById(data.userId);
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