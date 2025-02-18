const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Générer un token JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

// Inscription
const register = async (username, email, password) => {
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) throw new Error("Username or email already exists");

    const user = new User({ username, email, password });
    await user.save();

    return { user, token: generateToken(user._id) };
};

// Connexion
const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) throw new Error("Invalid password");

    return { user, token: generateToken(user._id) };
};

module.exports = { register, login };