const PkmnType = require("../models/PkmnType");

const getTypes = () => {
    return PkmnType;
};

module.exports = { getTypes };