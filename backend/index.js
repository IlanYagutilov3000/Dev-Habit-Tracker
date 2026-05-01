const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const dns = require("dns")
const rateLimit = require('express-rate-limit');
const cookieParser = require("cookie-parser")
require("./helpers/cronJobs")

const auth = require("./routes/auth")
const habit = require("./routes/habits")
const log = require("./routes/logs")

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express()
const port = process.env.PORT || 8000;

const logegr = (req, res, next) => {
    console.log(req.method + req.url);
    next()
};

mongoose.connect(process.env.DB).then(() => {
    console.log("Connected to MongoDB server baby");
}).catch((error) => {
    console.log(error)
})

// global rate limit 
const globalLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15M
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

// auth rate limit
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1H
    max: 3,
    message: "Too many login/register attempts. Please try again in an hour.",
});

/* app.use(cors()) */
app.use(cors({
    origin: "http://localhost:5173", // הכתובת של ה-Vite שלך
    credentials: true,               // מאפשר שליחת עוגיות ו-headers מיוחדים
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(globalLimit);
app.use(cookieParser())
app.use(express.json())
app.use(logegr)
app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authLimiter, auth)
app.use("/api/habits", habit)
app.use("/api/logs", log)

app.listen(port, () => console.log("Server is running on port", port))