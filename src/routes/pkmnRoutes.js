const express = require("express");
const { checkRole, authenticateToken, ROLES } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route accessible à tous
router.get("/public", (req, res) => {
    res.json({ message: "Accessible by anyone" });
});

// Route accessible uniquement aux utilisateurs authentifiés
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Accessible by authenticated users" });
});

// Route accessible uniquement aux admins
router.get("/admin", authenticateToken, checkRole(ROLES.ADMIN), (req, res) => {
    res.json({ message: "Accessible by admins only" });
});

module.exports = router;
