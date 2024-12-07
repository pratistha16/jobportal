const jwt = require("jsonwebtoken");

const token = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ error: "Failed to authenticate token" });
    }
};

module.exports = token;
