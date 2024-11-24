import {Router} from "express";
import User from "./../models/users.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get('/get-logged-user', authMiddleware, async (req, res) => {
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
})

userRouter.get('/get-all-users', authMiddleware, async (req, res) => {
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
})

export default userRouter;