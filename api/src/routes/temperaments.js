const {Router} = require("express")
const {getTemperamentH}= require("../handlers/temperamentsH")

const temperamentRouter = Router();

temperamentRouter.get("/", getTemperamentH)

module.exports = temperamentRouter;