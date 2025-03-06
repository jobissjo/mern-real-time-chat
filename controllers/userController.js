
import { getAllUsersService, getCurrentLoggedUser, updateProfilePicture, getFriendsListService } from "../services/userService.js";


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
        res.send({message: "Profile Pic updated successfully", data: uploadedImage.secure_url})
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

export {updateProfilePic, getAllUsers, getLoggedUser, getFriendsList};