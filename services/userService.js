import cloudinary from "../cloudinary.js";
import logger from "../config/loggerConfig.js";
import User from "./../models/users.js";
import { getAllChats } from "./chatService.js";

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
    return await User.findById(data.userId).populate('friends');
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

export const getFriendsListService = async (userId)=> {
    logger.info("User:"+ userId+ " access his friends list")
    const currentUser = await User.findOne({_id:userId}).populate("friends");
    return currentUser?.friends ?? [];

}

export const getNotChattedFriendsListService = async (userId)=> {
    logger.info("User:"+ userId+ " access his not chatted friends list")
    const currentUser = await User.findById(userId).populate("friends");
    const chattedFriendsList = await getAllChats({userId})
    const chattedFriendsIds = new Set(
        chattedFriendsList.flatMap(chat => chat.members.map(mem => mem._id.toString()))
    );

    const notChattedFriends = currentUser.friends.filter(friend => 
        !chattedFriendsIds.has(friend._id.toString())
    );
    return notChattedFriends;
 
}