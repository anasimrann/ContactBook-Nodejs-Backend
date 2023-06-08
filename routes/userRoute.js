const express = require("express");
const { registerUser, loginUser, currentUser } = require("../Controller/userController");
const verifyJWT = require("../Middleware/tokenHandler");
const router = express.Router();




router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", verifyJWT, currentUser);












module.exports = router;