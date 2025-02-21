const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const pkmnRoutes = require("./routes/pkmnRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const docsRoutes = require("./routes/docsRoutes");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/pokedex").then(() => {
    console.log("Connected to MongoDB");
});

// Définition des routes
app.use("/api/auth", authRoutes);
app.use("/api/pkmn", pkmnRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api", docsRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const apiRouter = express.Router();
app.use("/api", apiRouter);

// Import du contrôleur des types de Pokémon
const pkmnController = require("./controllers/pkmnController");

// Définition des routes Pokémon
apiRouter.get("/pkmn/types", pkmnController.getTypes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;