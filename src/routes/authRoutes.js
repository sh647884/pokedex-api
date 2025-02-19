const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/checkUser", authenticateToken, (req, res) => {
    res.json({ message: "User is authenticated", user: req.user });
});

module.exports = router;