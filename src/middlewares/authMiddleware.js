const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { ROLES } = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware d'authentification
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Authentication token required" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

// Middleware de permissions
const checkRole = (roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "User not authenticated" });

    const hasPermission = Array.isArray(roles) ? roles.includes(req.user.role) : roles === req.user.role;
    if (!hasPermission) return res.status(403).json({ message: "Insufficient permissions" });

    next();
};

module.exports = { authenticateToken, checkRole, ROLES };