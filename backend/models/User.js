const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        lowercase: true,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

}, { timestamps: true })

const User = mongoose.model("user", userSchema);
module.exports = User;