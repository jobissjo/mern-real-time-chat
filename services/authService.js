import redis from '../config/redisConfig.js';
import crypto from 'crypto'
import User from '../models/users.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getCurrentLoggedUser } from './userService.js';
import { sendTemplateMail } from '../utils/send_email_utils.js';

export const verifyEmailService = async (emailData) => {
    const {email, firstName} = emailData;
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

    let message = `Your OTP for account verification is: <b>${otp}</b> <br>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone`;
    

    await sendTemplateMail(email, "OTP for email verification", "email_otp_template", {message, name:firstName, companyName: "Quick Chat"})
    

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
    if (!user){
        throw new Error("User not found")
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid){
        throw new Error("Invalid password")
    }
    return jwt.sign({userId: user._id}, process.env.SECRET_KEY);
}   


export const changePasswordService = async (userData) => {
    const {userId, oldPassword, newPassword} = userData;

    const user = await getCurrentLoggedUser({userId});
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid){
        throw new Error("Invalid old password")
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
}


export const forgotPasswordService = async (userData) => {
    const {email} = userData;
    const user = await User.findOne({email});
    if (!user){
        throw new Error("User not found")
    }
    const otp = `${crypto.randomInt(100000, 1000000)}`;
    await redis.set(`${email}_forgot_password_otp`, otp, 'EX', 6000);
    let message = `Your OTP for forgot password is: <b>${otp}</b> <br>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone`;
    await sendTemplateMail(email, "OTP for forgot password", "email_otp_template", {message, name: user.firstName, companyName: "Quick Chat"})
}

export const resetPasswordService = async (userData) => {
    const {email, otp, newPassword} = userData;
    const user = await User.findOne({email});
    const otp_value = await redis.get(`${email}_forgot_password_otp`);
    if (!otp_value){
        throw new Error("OTP expired")
    }
    if (otp_value!== otp){
        throw new Error("Invalid OTP")
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
}


export const verifyOtpService = async (userData) => {
    const {email, otp} = userData;
    const otp_value = await redis.get(`${email}_otp`);
    if (!otp_value){
        throw new Error("OTP expired")
    }
    if (otp_value!== otp){
        throw new Error("Invalid OTP")
    }
    await redis.del(`${email}_otp`);
}