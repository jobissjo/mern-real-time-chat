import {Router} from "express";
import { getAllUsers, getLoggedUser, updateProfilePic, getFriendsList, notChattedFriends, searchUsersGlobally } from "../controllers/userController.js";

const userRouter = Router();


userRouter.get('/get-logged-user',  getLoggedUser);
userRouter.get('/get-all-users',  getAllUsers);
userRouter.put('/update-profile-pic',  updateProfilePic );
userRouter.get('/get-friends-list',  getFriendsList);
userRouter.get('/not-chatted-friends',  notChattedFriends)
userRouter.get('/search-global-users',  searchUsersGlobally);

export default userRouter;