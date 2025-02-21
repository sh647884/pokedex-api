const mongoose = require("mongoose");
const PkmnType = require("./PkmnType");

const regionSchema = new mongoose.Schema({
    regionName: { type: String, required: true },
    regionPokedexNumber: { type: Number, required: true }
}, { _id: false });

const pkmnSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    types: {
        type: [{ type: String, enum: PkmnType, required: true }],
        validate: [types => types.length >= 1 && types.length <= 2, "A Pokémon must have 1 or 2 types"]
    },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    regions: [regionSchema]
}, { timestamps: true });

module.exports = mongoose.model("Pokemon", pkmnSchema);