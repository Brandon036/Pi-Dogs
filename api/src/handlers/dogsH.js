const { getDogsApi, getDogsdb, getDogsById } = require("../controllers/dogsC")

const {Dog} =  require ("../db")

const getDogsHandler = async(req, res)=>{
    const {name} = req.query;

    const [api, db] = await Promise.all([getDogsApi(), getDogsdb()]);

    const allDogs = [...api, ...db]

    if (name) {
        try {
        let filterDogs = allDogs.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
       );
       filterDogs.length
        ? res.status(200).send(filterDogs)
        : res.status(401).send("No hay con ese nombre");
     } catch(error){
        return res.status(401).send("Error");
     }
    } else {
        res.send(allDogs);
    }
};

/*------------------------------------------------------------------------------ */

const getDogHandler = async (req, res) =>{
    const { id } = req.params;
    const Dog = await getDogsById(id);
    res.status(200).json(recipe);
};

/*------------------------------------------------------------------------------------ */

const postDogHandler = async (req, res) =>{
    const {id, name, image, height,  weight, temperament} = req.body;

    let dogs = await Dog.create({
        id, name, image, height,  weight, temperament
    })
    await dogs.addTemperament(temperament);
    res.send("Go")
}


module.exports = {getDogHandler, getDogsHandler, postDogHandler}