const pkmnService = require("../services/pkmnService");

const create = async (req, res) => {
    try { res.status(201).json({ data: await pkmnService.create(req.body) }); }
    catch (error) { res.status(400).json({ message: error.message }); }
};

const addRegion = async (req, res) => {
    try { res.json({ data: await pkmnService.addRegion(req.query.pkmnId, req.body) }); }
    catch (error) { res.status(400).json({ message: error.message }); }
};

const search = async (req, res) => {
    try { res.json(await pkmnService.search(req.query, req.query)); }
    catch (error) { res.status(400).json({ message: error.message }); }
};

const getOne = async (req, res) => {
    try {
        const { id, name } = req.query;
        const pokemon = id ? await pkmnService.getById(id) : await pkmnService.getByName(name);
        res.json({ data: pokemon });
    } catch (error) { res.status(404).json({ message: error.message }); }
};

const update = async (req, res) => {
    try { res.json({ data: await pkmnService.update(req.query.id, req.body) }); }
    catch (error) { res.status(400).json({ message: error.message }); }
};

const remove = async (req, res) => {
    try { await pkmnService.remove(req.query.id); res.status(204).send(); }
    catch (error) { res.status(404).json({ message: error.message }); }
};

const removeRegion = async (req, res) => {
    try { await pkmnService.removeRegion(req.query.pkmnId, req.query.regionName); res.status(204).send(); }
    catch (error) { res.status(400).json({ message: error.message }); }
};

const getTypes = (req, res) => {
    const types = pkmnService.getTypes();
    res.json({
        data: types,
        count: types.length
    });
};

module.exports = { create, addRegion, search, getOne, update, remove, removeRegion, getTypes };