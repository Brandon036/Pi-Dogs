const {getTemperamentTypesDb} = require("../controllers/temperamentsC")

const getTemperamentH = async (req, res) => {
    res.send(await getTemperamentTypesDb());
}
module.exports = { getTemperamentH}