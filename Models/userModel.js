const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        required: [true, "Please proivde the username"]
    },

    email: {
        type: String,
        required: [true, "Please provide the valid email"],
        unique: [true, "This email already exists.."]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    Timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;