import redis from '../config/redisConfig.js';
import crypto from 'crypto'
import User from '../models/users.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const verifyEmailService = async (emailData) => {
    const {email} = emailData;
    if (!email){
        throw new Error("Email is required");
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)){
        throw new Error("Invalid email format");
    }
    const isEmailTaken = await User.findOne({email});
    if(isEmailTaken){
        throw new Error("Email already exists");
    }

    const otp = `${crypto.randomInt(100000, 1000000)}`;
    await redis.set(`${email}_otp`, otp, 'EX', 6000);
    console.log("otp", otp);
    

}


export const signUpUserService = async (userData) => {
    const {otp, email, password} = userData;
    const user = await User.findOne({email})

    const otp_value = await redis.get(`${email}_otp`);
    console.error("otp", otp_value, "entered_otp", otp)
    if (!otp_value){
        throw new Error("OTP expired")
    }
    if (otp_value !== otp){
        throw new Error("Invalid OTP")
    }
            
    if (user){
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    userData.password = hashedPassword
    const newUser = new User(userData)
    await newUser.save()
}

export const loginUserService = async (userData) => {
    const {email, password} = userData;
    const user = await User.findOne({email});
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        throw new Error("Invalid password")
    }
    return jwt.sign({userId: user._id}, process.env.SECRET_KEY);
}   