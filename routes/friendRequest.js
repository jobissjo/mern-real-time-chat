import { Router } from "express";
import { acceptFriendRequestController, cancelFriendRequestController, getFriendRequestsController, rejectFriendRequestController, sendFriendRequestController } from "../controllers/friendRequestController.js";


const friendRequestRouter = Router();

friendRequestRouter.post('/send-friend-request',  sendFriendRequestController);
friendRequestRouter.put('/accept-friend-request',  acceptFriendRequestController);
friendRequestRouter.put('/reject-friend-request',  rejectFriendRequestController);
friendRequestRouter.get('/get-friend-requests',  getFriendRequestsController);
friendRequestRouter.put('/cancel-friend-request',  cancelFriendRequestController);

export default friendRequestRouter;