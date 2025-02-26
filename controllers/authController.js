import {verifyEmailService, signUpUserService, loginUserService} from "../services/authService.js"


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

export { verifyEmail, signUpUser, loginUser };