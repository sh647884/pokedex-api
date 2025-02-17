const pkmnService = require("../services/pkmnService");

const getTypes = (req, res) => {
    const types = pkmnService.getTypes();
    res.json({
        data: types,
        count: types.length
    });
};

module.exports = { getTypes };