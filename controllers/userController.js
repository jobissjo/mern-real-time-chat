
import User from "./../models/users.js";

import cloudinary from "../cloudinary.js";


const getLoggedUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

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
        const allUsers = await User.find({_id: {$ne: req.body.userId}})

        res.send({
            message: "User Detail fetched successfully",
            data: allUsers
        });
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
}

const updateProfilePic = async (req, res)=> {
    try{
        const uploadedImage = await cloudinary.uploader.upload(req.body.profilePic, {
            folder: 'quick-chat'
        })

        await User.findByIdAndUpdate(
            {_id: req.body.userId},
            {profilePic: uploadedImage.secure_url},
            {new:true}
        )
        res.send({message: "Profile Pic updated successfully", data: uploadedImage.secure_url})
    }
    catch(error){
        res.status(400).send({message: error.message})
    }
}

export {updateProfilePic, getAllUsers, getLoggedUser};