const {Router} = require("express")
const {getDogsHandler, getDogHandler, postDogHandler } = require("../handlers/dogsH")

const DogsRouter = Router()

DogsRouter.get("/", getDogsHandler)
DogsRouter.get("/id:", getDogHandler)
DogsRouter.get("/?name", getDogsHandler)
DogsRouter.get("/", postDogHandler)

module.exports = DogsRouter;




