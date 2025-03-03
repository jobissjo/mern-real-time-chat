import friendRequest from "../models/friend.js";
import { FRIEND_REQUEST_STATUS } from "../config/constants.js";
import Notification from "../models/notification.js";
import { getCurrentLoggedUser } from "./userService.js";

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
    await friendRequest.create({fromUser, toUser});
    Notification.create({"recipient": toUser, "message": `Friend request received from ${toUser.firstName}`, "notificationType": "friendRequest"});
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

    const toUserInfo = await getCurrentLoggedUser({userId: toUser})

    Notification.create({"recipient": updatedRequest.fromUser, "message": `Friend request accepted for ${toUserInfo.firstName}`});

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
    const friendRequests = await friendRequest.find(
            {toUser, status: FRIEND_REQUEST_STATUS.PENDING}
        ).populate("fromUser")
        .populate("toUser");
    return friendRequests;
}

export const cancelFriendRequest = async (fromUser, requestId)=> {
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