import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).send({
                message: "Authentication token is not provided",
            })
        }
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, process.env.SECRET_KEY);
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY);
        req.body.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        res.status(401).send({
            message: err.message,
        })
    }
}