const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification des utilisateurs (inscription, connexion, vérification)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID unique de l'utilisateur
 *           example: "65d9e6b1a7c3a2f5b9e8d6e4"
 *         username:
 *           type: string
 *           description: Nom d'utilisateur unique
 *           example: "Trainer123"
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse e-mail de l'utilisateur
 *           example: "trainer@example.com"
 *         role:
 *           type: string
 *           enum: [USER, ADMIN]
 *           description: Rôle de l'utilisateur (par défaut "USER")
 *           example: "USER"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du compte
 *           example: "2025-02-20T12:34:56.789Z"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: Jeton JWT pour l'authentification
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message d'erreur détaillé
 *           example: "Username or email already exists"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     description: Permet à un utilisateur de s'inscrire en fournissant un nom d'utilisateur, un email et un mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur unique
 *                 example: "Trainer123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse e-mail valide
 *                 example: "trainer@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe sécurisé
 *                 example: "StrongPass123!"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Erreur de validation ou utilisateur déjà existant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur existant
 *     tags: [Auth]
 *     description: Permet à un utilisateur de se connecter avec son nom d'utilisateur et son mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *                 example: "Trainer123"
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *                 example: "StrongPass123!"
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Identifiants incorrects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /auth/checkUser:
 *   get:
 *     summary: Vérification de l'authentification de l'utilisateur
 *     tags: [Auth]
 *     description: Vérifie si l'utilisateur est authentifié en validant le token JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: L'utilisateur est authentifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User is authenticated"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token invalide ou expiré
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/checkUser", authenticateToken, (req, res) => {
    res.json({ message: "User is authenticated", user: req.user });
});

module.exports = router;