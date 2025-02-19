const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const pkmnRoutes = require("./routes/pkmnRoutes");

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