import {verifyEmailService, signUpUserService, loginUserService, changePasswordService, forgotPasswordService, resetPasswordService, verifyOtpService} from "../services/authService.js"


const verifyEmail = async (req, res) => {
    try{
        await verifyEmailService(req.body)
        res.status(200).send({message: "Otp send to your email address successfully"})
    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
}

const signUpUser =  async (req, res) => {
    try {
        await signUpUserService(req.body)
        res.status(200).send({message: "User created successfully"})

    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const token = await loginUserService(req.body);
        
        return res.send({message: "User logged in successfully",
            token: token
        })
        
    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
    
    
}

const changePassword = async (req, res) => {
    try {
        await changePasswordService(req.body)
        res.status(200).send({message: "Password changed successfully"})
    }
    catch (error) {
        res.status(400).send({message: error.message})
    }
}

const forgotPassword = async (req, res) => {
    await forgotPasswordService(req.body);
    res.status(200).send({message: "Otp send to your email address successfully"})
}

const resetPassword = async (req, res) => {
    await resetPasswordService(req.body);
    res.status(200).send({message: "Password reset successfully"})
}

const verifyOtp = async (req, res) => {
    await verifyOtpService(req.body);
    res.status(200).send({message: "Otp verified successfully"})
}
export { verifyEmail, signUpUser, loginUser, changePassword, forgotPassword, resetPassword, verifyOtp };