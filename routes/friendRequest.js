import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { acceptFriendRequestController, cancelFriendRequestController, getFriendRequestsController, rejectFriendRequestController, sendFriendRequestController } from "../controllers/friendRequestController.js";


const friendRequestRouter = Router();

friendRequestRouter.post('/send-friend-request', authMiddleware, sendFriendRequestController);
friendRequestRouter.put('/accept-friend-request', authMiddleware, acceptFriendRequestController);
friendRequestRouter.put('/reject-friend-request', authMiddleware, rejectFriendRequestController);
friendRequestRouter.get('/get-friend-requests', authMiddleware, getFriendRequestsController);
friendRequestRouter.put('/cancel-friend-request', authMiddleware, cancelFriendRequestController);

export default friendRequestRouter;