import cloudinary from "../cloudinary.js";
import { FRIEND_REQUEST_STATUS } from "../config/constants.js";
import logger from "../config/loggerConfig.js";
import FriendRequests from "../models/friend.js";
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




export const searchGlobalUsers = async (searchKey, userId) => {
    logger.info(`User: ${userId} searched for global users`);

    let users = await User.find({
        $or: [
            { firstName: { $regex: searchKey, $options: 'i' } },
            { lastName: { $regex: searchKey, $options: 'i' } },
            { email: { $regex: searchKey, $options: 'i' } }
        ]
    }).lean();

    // Remove the current user from the list
    users = users.filter(user => user._id.toString() !== userId);

    // Fetch friend requests related to the user
    const friendRequests = await FriendRequests.find({
        $or: [{ fromUser: userId }, { toUser: userId }]
    }).select("fromUser toUser status").lean();

    console.log("friendRequests:", friendRequests);

    // Add `isFriend`, `isFriendRequest`, `isReceivedRequest` properties
    users = users.map(user => {
        let requestId = null;
        const sentRequest = friendRequests.some(fr =>
            fr.fromUser.toString() === userId &&
            fr.toUser.toString() === user._id.toString() &&
            fr.status === FRIEND_REQUEST_STATUS.PENDING
        );

        const receivedRequest = friendRequests.some(fr =>
            fr.fromUser.toString() === user._id.toString() &&
            fr.toUser.toString() === userId &&
            fr.status === FRIEND_REQUEST_STATUS.PENDING
        );
        
        if (receivedRequest || sentRequest) {
            const request = friendRequests.find(fr =>
            (fr.fromUser.toString() === user._id.toString() &&
            fr.toUser.toString() === userId &&
            fr.status === FRIEND_REQUEST_STATUS.PENDING) ||
            fr.fromUser.toString() === userId &&
            fr.toUser.toString() === user._id.toString() && fr.status === FRIEND_REQUEST_STATUS.PENDING
            );
            requestId = request?._id;
        }

        return {
            ...user,
            isFriend: Boolean(user.friends?.some(friendId => friendId.toString() === userId)),
            isFriendRequest: sentRequest,
            isReceivedRequest: receivedRequest,
            requestId:requestId
        };
    });

    console.log("Processed Users:", users);

    return users;
};


export const updateUserService = async (userId, userData)=> {
    const updatedUser = await User.findByIdAndUpdate(userId,
        {$set: userData},
        {new: true, runValidators: true}
    )
    if (!updatedUser) {
        throw new Error("User not found")
    }
    return updatedUser;

}