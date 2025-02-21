const Pokemon = require("../models/Pkmn");
const PkmnType = require("../models/PkmnType");

const create = async (data) => {
    if (await Pokemon.findOne({ name: data.name })) throw new Error("Pokemon already exists");
    return await Pokemon.create(data);
};

const addRegion = async (pkmnId, regionData) => {
    const pokemon = await Pokemon.findById(pkmnId);
    if (!pokemon) throw new Error("Pokemon not found");
    
    const regionIndex = pokemon.regions.findIndex(r => r.regionName === regionData.regionName);
    regionIndex !== -1 ? pokemon.regions[regionIndex] = regionData : pokemon.regions.push(regionData);
    return await pokemon.save();
};

const search = async ({ partialName, typeOne, typeTwo }, { page = 1, size = 20 }) => {
    const query = {};
    if (partialName) query.name = new RegExp(partialName, "i");
    if (typeOne || typeTwo) query.types = { $all: [typeOne, typeTwo].filter(Boolean) };
    
    const total = await Pokemon.countDocuments(query);
    const pokemons = await Pokemon.find(query).skip((page - 1) * size).limit(size);
    
    return { data: pokemons, count: total, page, totalPages: Math.ceil(total / size) };
};

const getById = async (id) => {
    const pokemon = await Pokemon.findById(id);
    if (!pokemon) throw new Error("Pokemon not found");
    return pokemon;
};

const getByName = async (name) => {
    const pokemon = await Pokemon.findOne({ name });
    if (!pokemon) throw new Error("Pokemon not found");
    return pokemon;
};

const update = async (id, updateData) => {
    const pokemon = await Pokemon.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!pokemon) throw new Error("Pokemon not found");
    return pokemon;
};

const remove = async (id) => {
    const pokemon = await Pokemon.findByIdAndDelete(id);
    if (!pokemon) throw new Error("Pokemon not found");
};

const removeRegion = async (pkmnId, regionName) => {
    const pokemon = await Pokemon.findById(pkmnId);
    if (!pokemon) throw new Error("Pokemon not found");
    
    pokemon.regions = pokemon.regions.filter(region => region.regionName !== regionName);
    return await pokemon.save();
};

const getTypes = () => {
    return PkmnType;
};

module.exports = { create, addRegion, search, getById, getByName, update, remove, removeRegion, getTypes };