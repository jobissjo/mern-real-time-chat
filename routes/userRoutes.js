import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAllUsers, getLoggedUser, updateProfilePic, getFriendsList } from "../controllers/userController.js";

const userRouter = Router();


userRouter.get('/get-logged-user', authMiddleware, getLoggedUser);
userRouter.get('/get-all-users', authMiddleware, getAllUsers);
userRouter.put('/update-profile-pic', authMiddleware, updateProfilePic );
userRouter.get('/get-friends-list', authMiddleware, getFriendsList);

export default userRouter;