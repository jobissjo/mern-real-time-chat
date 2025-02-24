import redis from '../config/redisConfig';
import crypto from 'crypto'

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