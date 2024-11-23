import { Router } from "express";
import User from "../models/users.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = Router();

router.post('/signup', async (req, res) => {
    try {
        // User Exists
        const user = await User.findOne({email: req.body.email})
        
        if (user){
            return res.status(400).send({message: "User already exists"})
        }


        // Encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword

        // Create a new user, save in database
        const newUser = new User(req.body)
        await newUser.save()

        return res.status(201).send({message: "User created successfully"});

    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        // User Exists
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send({message: "User does not exist"})
        }
        // Password is correct
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if(!isValid){
            return res.status(400).send({message: "Invalid password"})
        }
        // Generate JWT Token
    
        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)
        
        return res.send({message: "User logged in successfully",
            token: token
        })
        
    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
    
    
})

export default router