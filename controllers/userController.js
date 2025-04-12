
import { getAllUsersService, getCurrentLoggedUser, updateProfilePicture, getFriendsListService, getNotChattedFriendsListService, searchGlobalUsers, updateUserService } from "../services/userService.js";
import { CustomError } from "../utils/helper.js";


const getLoggedUser = async (req, res) => {
    try {
        const user = await getCurrentLoggedUser(req.body);

        res.send({
            message: "User Detail fetched successfully",
            data: user
        });
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await getAllUsersService(req.body);
        res.send({
            message: "All User Detail fetched successfully",
            data: allUsers
        });
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
}

const updateProfilePic = async (req, res)=> {
    try{
        await updateProfilePicture(req.body)
        res.send({message: "Profile Pic updated successfully", data: null})
    }
    catch(error){
        res.status(400).send({message: error.message})
    }
}

const getFriendsList = async (req, res)=> {
    try{
        const friends = await getFriendsListService(req.body.userId)
        res.send({
            message: "Friends fetched successfully",
            data: friends
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const notChattedFriends = async (req, res)=> {
    try{
        const notChattedFriends = await getNotChattedFriendsListService(req.body.userId)
        res.send({
            message: "Not Chatted Friends fetched successfully",
            data: notChattedFriends
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const searchUsersGlobally = async (req, res) => {
    try {
        const users = await searchGlobalUsers(req.query.searchKey, req.body.userId);
        res.send({
            message: "Users searched successfully",
            data: users
        });
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
}

const updateUserController = async (req, res) => {
    try {
        const user = await updateUserService(req.body.userId, req.body);
        res.send({
            message: "User updated successfully",
            data: user
        });
    }
    catch (error) {
        throw new CustomError(error.message, 500)
    }
}


export {updateProfilePic, getAllUsers, getLoggedUser, getFriendsList, notChattedFriends, searchUsersGlobally, updateUserController};