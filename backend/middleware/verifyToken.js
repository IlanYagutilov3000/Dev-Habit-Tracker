const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies["token"];
        if (!token) return res.status(401).send("Access denied: no token was provided")
        const checkToken = jwt.verify(token, process.env.JWTKEY);
        req.user = checkToken;
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}