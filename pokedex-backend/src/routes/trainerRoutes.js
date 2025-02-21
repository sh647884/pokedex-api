const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Trainer:
 *       type: object
 *       required:
 *         - trainerName
 *         - imgUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du dresseur
 *           example: "65d4a5f3c7e9b6a1f7a9c8d2"
 *         username:
 *           type: string
 *           description: Username de l'utilisateur lié
 *           example: "ashKetchum"
 *         trainerName:
 *           type: string
 *           description: Nom du dresseur
 *           example: "Sacha"
 *         imgUrl:
 *           type: string
 *           description: URL de l'image du dresseur
 *           example: "https://example.com/avatar.jpg"
 *         creationDate:
 *           type: string
 *           format: date-time
 *           description: Date de création du dresseur
 *           example: "2025-02-19T12:34:56Z"
 *         pkmnSeen:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des ID des Pokémon vus
 *           example: ["65d4a6f3c7e9b6a1f7a9c8e5"]
 *         pkmnCatch:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des ID des Pokémon capturés
 *           example: ["65d4a7f3c7e9b6a1f7a9c9a3"]
 */

/**
 * @swagger
 * tags:
 *   name: Trainer
 *   description: Gestion des dresseurs Pokémon
 */

/**
 * @swagger
 * /api/trainer:
 *   post:
 *     summary: Crée un nouveau dresseur
 *     description: Associe un dresseur à l'utilisateur authentifié avec un nom et une image.
 *     security:
 *       - bearerAuth: []
 *     tags: [Trainer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trainerName
 *               - imgUrl
 *             properties:
 *               trainerName:
 *                 type: string
 *                 example: "Sacha"
 *               imgUrl:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: Dresseur créé avec succès
 *       400:
 *         description: Dresseur déjà existant
 *       401:
 *         description: Non authentifié
 */
router.post('/', authenticateToken, trainerController.create);

/**
 * @swagger
 * /api/trainer:
 *   get:
 *     summary: Récupère les informations du dresseur actuel
 *     description: Retourne les informations du dresseur lié à l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     tags: [Trainer]
 *     responses:
 *       200:
 *         description: Informations du dresseur récupérées avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dresseur non trouvé
 */
router.get('/', authenticateToken, trainerController.get);

/**
 * @swagger
 * /api/trainer:
 *   put:
 *     summary: Met à jour les informations du dresseur
 *     description: Permet de modifier le nom et l'image du dresseur de l'utilisateur connecté.
 *     security:
 *       - bearerAuth: []
 *     tags: [Trainer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerName:
 *                 type: string
 *                 example: "Sacha Ketchum"
 *               imgUrl:
 *                 type: string
 *                 example: "https://example.com/new-avatar.jpg"
 *     responses:
 *       200:
 *         description: Dresseur mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dresseur non trouvé
 */
router.put('/', authenticateToken, trainerController.update);

/**
 * @swagger
 * /api/trainer:
 *   delete:
 *     summary: Supprime le dresseur de l'utilisateur actuel
 *     description: Supprime définitivement le dresseur lié à l'utilisateur authentifié.
 *     security:
 *       - bearerAuth: []
 *     tags: [Trainer]
 *     responses:
 *       204:
 *         description: Dresseur supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dresseur non trouvé
 */
router.delete('/', authenticateToken, trainerController.delete);

/**
 * @swagger
 * /api/trainer/mark:
 *   post:
 *     summary: Marque un Pokémon comme vu ou capturé
 *     description: Ajoute un Pokémon à la liste des Pokémon vus ou capturés du dresseur connecté.
 *     security:
 *       - bearerAuth: []
 *     tags: [Trainer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pokemonId
 *               - isCaptured
 *             properties:
 *               pokemonId:
 *                 type: string
 *                 description: ID du Pokémon à marquer
 *                 example: "65d4a7f3c7e9b6a1f7a9c9a3"
 *               isCaptured:
 *                 type: boolean
 *                 description: true pour capturé, false pour vu
 *                 example: true
 *     responses:
 *       200:
 *         description: Pokémon marqué avec succès
 *       400:
 *         description: Pokémon invalide ou déjà marqué
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Dresseur ou Pokémon non trouvé
 */
router.post('/mark', authenticateToken, trainerController.markPokemon);

module.exports = router;