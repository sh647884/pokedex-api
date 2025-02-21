const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ROLES = {
    USER: "USER",
    ADMIN: "ADMIN"
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = { User: mongoose.model("User", userSchema), ROLES };