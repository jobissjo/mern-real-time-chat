import friendRequest from "../models/friend.js";
import { FRIEND_REQUEST_STATUS } from "../config/constants.js";
import Notification from "../models/notification.js";
import { getCurrentLoggedUser } from "./userService.js";
import logger from "../config/loggerConfig.js";

export const sendFriendRequest = async (fromUser, toUser, )=> {
    if(!toUser){
        throw new Error("Send friend is required to send friend request")
    }
    const alreadyPendingRequest = await friendRequest.findOne(
        {fromUser, toUser, status: FRIEND_REQUEST_STATUS.PENDING}, 
    )
    if (alreadyPendingRequest){
        throw new Error("Friend request already sent")
    }
    const alreadyAcceptedRequest = await friendRequest.findOne(
        {fromUser, toUser, status: FRIEND_REQUEST_STATUS.ACCEPTED}, 
    )
    if (alreadyAcceptedRequest){
        throw new Error("You are already friend")
    }
    const alreadyRejectedCount = await friendRequest.countDocuments({fromUser, toUser, status: FRIEND_REQUEST_STATUS.REJECTED})
    if (alreadyRejectedCount > 2){
        throw new Error("You cannot give more than two request rejected user")
    }
    await friendRequest.create({fromUser, toUser, status: FRIEND_REQUEST_STATUS.PENDING})
    const toUserInfo = await getCurrentLoggedUser({userId: toUser})
    Notification.create({"recipient": toUser, "message": `Friend request received from ${toUserInfo.firstName}`, "notificationType": "friendRequest"});
}

export const acceptFriendRequest = async (toUser, requestId)=> {
    
    const friendReq = await friendRequest.findOne(
        {toUser, _id:requestId}, 
    );
    if (!friendReq){
        throw new Error("Friend request not found")
    }
    if (friendReq.status !== FRIEND_REQUEST_STATUS.PENDING){
        throw new Error("Friend request already accepted/rejected")
    }
    friendReq.status = FRIEND_REQUEST_STATUS.ACCEPTED;
    await friendReq.save();

    const toUserInfo = await getCurrentLoggedUser({userId: toUser});

    if(!toUserInfo.friends){
        toUserInfo.friends = [];
    }
    toUserInfo.friends.push(friendReq.fromUser);
    await toUserInfo.save()

    const fromUserInfo = await getCurrentLoggedUser({userId: friendReq.fromUser});
    if(!fromUserInfo.friends){
        fromUserInfo.friends = [];
    }
    fromUserInfo.friends.push(friendReq.toUser);
    await fromUserInfo.save()
    Notification.create({"recipient": friendReq.fromUser, "message": `Friend request accepted for ${toUserInfo.firstName}`});

}

export const rejectFriendRequest = async (toUser, requestId)=> {
    const friendReq = await friendRequest.findOne(
        {
            toUser, 
            _id:requestId
        })
    if (!friendReq){
        throw new Error("Friend request not found")
    }
    if (friendReq.status!== FRIEND_REQUEST_STATUS.PENDING){
        throw new Error("Friend request already accepted/rejected")
    }
    friendReq.status = FRIEND_REQUEST_STATUS.REJECTED;
    await friendReq.save();
    Notification.create({"recipient": updatedRequest.fromUser, "message": "Friend request rejected"});
}

export const getFriendRequests = async (toUser)=> {
    logger.info("Getting friend requests list..."+ toUser);
    
    const friendRequests = await friendRequest.find(
            {toUser, status: FRIEND_REQUEST_STATUS.PENDING}
        ).populate("fromUser")
        .populate("toUser");
    return friendRequests;
}

export const cancelFriendRequest = async (fromUser, requestId)=> {
    logger.info("Canceling friend request..."+ fromUser);
    const friendReq = await friendRequest.findOne(
        {fromUser, _id: requestId}, 
    );
    if (!friendReq){
        throw new Error("Friend request not found")
    }
    if (friendReq.status !== FRIEND_REQUEST_STATUS.PENDING){
        throw new Error("Friend request already accepted/rejected")
    }
    friendReq.status = FRIEND_REQUEST_STATUS.CANCELLED;
    await friendReq.save();
}