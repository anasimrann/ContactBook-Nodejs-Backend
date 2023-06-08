const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrpyt = require("bcrypt");
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
        res.status(400)
        throw new Error("User Already Exists")
    }
    const hashPassword = await bcrpyt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })

    return res.status(201).json(username, email)
});


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '1m' }
        );
        return res.status(200).json({ accessToken })
    }
    else {
        res.status(401);
        throw new Error("Email or Password is incorrect")
    }
});

const currentUser = asyncHandler(async(req,res)=> {
    return res.status(200).json(req.user);
})

module.exports = { registerUser,loginUser,currentUser }