const express = require("express");
const { checkRole, authenticateToken, ROLES } = require("../middlewares/authMiddleware");
const pkmnController = require("../controllers/pkmnController");

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

// Routes Pokémon
router.post("/", authenticateToken, pkmnController.create);
router.post("/region", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.addRegion);
router.get("/search", authenticateToken, pkmnController.search);
router.get("/", authenticateToken, pkmnController.getOne);
router.put("/", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.update);
router.delete("/", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.remove);
router.delete("/region", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.removeRegion);

module.exports = router;