const express = require("express");
const { checkRole, authenticateToken, ROLES } = require("../middlewares/authMiddleware");
const pkmnController = require("../controllers/pkmnController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Pokemon:
 *       type: object
 *       required:
 *         - name
 *         - types
 *         - description
 *         - imgUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: ID unique du Pokémon
 *           example: "65d4a5f3c7e9b6a1f7a9c8d2"
 *         name:
 *           type: string
 *           description: Nom du Pokémon
 *           example: "Pikachu"
 *         types:
 *           type: array
 *           items:
 *             type: string
 *           description: Types du Pokémon (1 ou 2 max)
 *           example: ["Electric"]
 *         description:
 *           type: string
 *           description: Description du Pokémon
 *           example: "Un Pokémon souris capable de générer de l'électricité."
 *         imgUrl:
 *           type: string
 *           description: URL de l'image du Pokémon
 *           example: "https://example.com/pikachu.jpg"
 *         regions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               regionName:
 *                 type: string
 *                 description: Nom de la région
 *                 example: "Kanto"
 *               regionPokedexNumber:
 *                 type: number
 *                 description: Numéro du Pokédex dans la région
 *                 example: 25
 */

/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: Gestion des Pokémon
 */

/**
 * @swagger
 * /api/pkmn:
 *   post:
 *     summary: Ajoute un nouveau Pokémon
 *     description: Crée un Pokémon s'il n'existe pas déjà.
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - types
 *               - description
 *               - imgUrl
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pikachu"
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Electric"]
 *               description:
 *                 type: string
 *                 example: "Un Pokémon souris capable de générer de l'électricité."
 *               imgUrl:
 *                 type: string
 *                 example: "https://example.com/pikachu.jpg"
 *     responses:
 *       201:
 *         description: Pokémon créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       400:
 *         description: Pokémon déjà existant ou données invalides
 *       401:
 *         description: Non authentifié
 */
router.post("/", authenticateToken, pkmnController.create);

/**
 * @swagger
 * /pkmn/region:
 *   post:
 *     summary: Ajoute ou modifie une région pour un Pokémon
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: pkmnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du Pokémon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regionName:
 *                 type: string
 *                 example: Kanto
 *               regionPokedexNumber:
 *                 type: number
 *                 example: 25
 *     responses:
 *       200:
 *         description: Région ajoutée/modifiée avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */
router.post("/region", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.addRegion);

/**
 * @swagger
 * /pkmn/search:
 *   get:
 *     summary: Recherche des Pokémon avec filtres
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: partialName
 *         schema:
 *           type: string
 *         description: Nom partiel du Pokémon
 *       - in: query
 *         name: typeOne
 *         schema:
 *           type: string
 *         description: Premier type du Pokémon
 *       - in: query
 *         name: typeTwo
 *         schema:
 *           type: string
 *         description: Deuxième type du Pokémon
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Numéro de la page
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: Taille de la page
 *     responses:
 *       200:
 *         description: Liste des Pokémon correspondant aux critères
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */
router.get("/search", authenticateToken, pkmnController.search);

/**
 * @swagger
 * /pkmn:
 *   get:
 *     summary: Récupère un Pokémon par ID ou par nom
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID du Pokémon
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nom du Pokémon
 *     responses:
 *       200:
 *         description: Pokémon trouvé
 *       404:
 *         description: Pokémon non trouvé
 *       401:
 *         description: Non autorisé
 */
router.get("/", authenticateToken, pkmnController.getOne);

/**
 * @swagger
 * /pkmn:
 *   put:
 *     summary: Met à jour un Pokémon existant
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du Pokémon à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *               description:
 *                 type: string
 *               imgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pokémon mis à jour
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Pokémon non trouvé
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */
router.put("/", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.update);

/**
 * @swagger
 * /pkmn:
 *   delete:
 *     summary: Supprime un Pokémon
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du Pokémon à supprimer
 *     responses:
 *       204:
 *         description: Pokémon supprimé
 *       404:
 *         description: Pokémon non trouvé
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */
router.delete("/", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.remove);

/**
 * @swagger
 * /pkmn/region:
 *   delete:
 *     summary: Supprime une région d'un Pokémon
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: pkmnId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du Pokémon
 *       - in: query
 *         name: regionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la région à supprimer
 *     responses:
 *       204:
 *         description: Région supprimée du Pokémon
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Pokémon non trouvé
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */
router.delete("/region", authenticateToken, checkRole(ROLES.ADMIN), pkmnController.removeRegion);

/**
 * @swagger
 * /api/pkmn/public:
 *   get:
 *     summary: Accès public
 *     description: Route de test accessible par tous.
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Réponse pour test
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accessible by anyone"
 */
router.get("/public", (req, res) => {
    res.json({ message: "Accessible by anyone" });
});

/**
 * @swagger
 * /api/pkmn/protected:
 *   get:
 *     summary: Accès protégé
 *     description: Route de test accessible uniquement aux utilisateurs authentifiés.
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Réponse pour utilisateurs authentifiés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accessible by authenticated users"
 *       401:
 *         description: Non authentifié
 */
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Accessible by authenticated users" });
});

/**
 * @swagger
 * /api/pkmn/admin:
 *   get:
 *     summary: Accès administrateur
 *     description: Route de test accessible uniquement aux administrateurs.
 *     security:
 *       - bearerAuth: []
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Réponse pour administrateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accessible by admins only"
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès interdit (pas le rôle ADMIN)
 */
router.get("/admin", authenticateToken, checkRole(ROLES.ADMIN), (req, res) => {
    res.json({ message: "Accessible by admins only" });
});

module.exports = router;