const User      = require('../models/User');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');


const createNewUser = async (req, res) => {
    try {
        const { name, userName, password } = req.body;

        // check if the userName is unique or not
        const isUserNameUnique = await User.findOne({userName: userName});
        if(isUserNameUnique)
        {
            return res.status(403).message({
                success: false,
                message: "Username already exist! Try with another one."
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name, userName: userName, password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Someting went wrong. Error: ${error}`
        })
    }
};

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // check if the user exist or not
        const userData = await User.findOne({userName});
        if(!userData)
        {
            return res.status(404).json({
                success: false,
                message: "User data not found. Please enter username properly."
            })
        }

        // check the password is matching with the entered password
        const isPasswordMatching = await bcrypt.compare(password, userData.password);
        if(!isPasswordMatching)
        {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials. Please try again."
            })
        }

        // create json access token
        const accesstoken = jwt.sign({
            userId: userData._id,
            name: userData.name,
            userName: userData.userName
        }, process.env.JWT_SECRET_KEY, 
        { expiresIn: '30m'})

        res.status(200).json({
            success: true,
            message: "User login successfull",
            accesstoken
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Someting went wrong. Error: ${error}`
        })
    }
}

module.exports = {
    createNewUser, loginUser
}