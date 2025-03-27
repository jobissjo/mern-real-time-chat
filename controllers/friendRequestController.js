import { acceptFriendRequest, sendFriendRequest, rejectFriendRequest, getFriendRequests, cancelFriendRequest } from "../services/friendRequestService.js";

const sendFriendRequestController = async (req, res) => {
    try {
        const request = await sendFriendRequest(req.body.userId, req.body.receiverId);
        res.send({
            message: "Friend request sent successfully",
            data: request
        });
        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const acceptFriendRequestController = async (req, res) => {
    try {
        acceptFriendRequest(req.body.userId, req.body.requestId)
        res.send({
            message: "Friend request accepted successfully",
            data: null
        });
        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const rejectFriendRequestController = async (req, res) => {
    try {
        rejectFriendRequest(req.body.userId, req.body.requestId)
        res.send({
            message: "Friend request rejected successfully",
            data: request
        });
        
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const cancelFriendRequestController = (req, res) => {
    try{
        cancelFriendRequest(req.body.userId, req.body.requestId)
        res.send({
            message: "Friend request canceled successfully",
            data: request
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const getFriendRequestsController = async (req, res) => {
    try {
        const requests = await getFriendRequests(req.body.userId);
        res.send({
            message: "Friend requests fetched successfully",
            data: requests
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export {sendFriendRequestController, acceptFriendRequestController, 
    rejectFriendRequestController, cancelFriendRequestController,
    getFriendRequestsController};