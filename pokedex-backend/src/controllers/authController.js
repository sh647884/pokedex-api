const { register, login } = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { user, token } = await register(username, email, password);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await login(username, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };