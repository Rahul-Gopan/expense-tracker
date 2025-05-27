const jwt = require('jsonwebtoken');

const verifiedUser = (req, res, next) => {

    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Access denied. No access token provided"
        })
    }

    try {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = userInfo;
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: `Authentication failed. Something went wrong. Error: ${error}`
        })
    }
}

module.exports = {
    verifiedUser
}