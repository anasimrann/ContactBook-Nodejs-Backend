const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const verifyJWT = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        const accessToken = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401);
            throw new Error('Invalid Access Token');
        }
    } else {
        res.status(401);
        throw new Error('Missing or Invalid Authorization Header');
    }
});

module.exports = verifyJWT