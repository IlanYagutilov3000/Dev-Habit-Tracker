const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

const registerSchema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
})

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
})

// register user
router.post("/register", async (req, res) => {
    try {
        // checking if the body matches the schema, turn it later to validate async don't forget
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User all ready exists");

        user = new User(req.body);

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()

        const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWTKEY, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true
        })
        res.status(201).json({
            message: "User created successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

// login user
router.post("/login", async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("Invalid email or password");

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(401).send("Invalid email or password");

        const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWTKEY, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true
        })

        res.status(200).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).send(error)
    }
})

// get the user if he is logged in so we will have him after a refresha dna ll that
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) res.status(404).send("user not found")

        res.status(200).json({
            message: "User logged in successfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

//logout user
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router