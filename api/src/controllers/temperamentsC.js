const {axios} = require("axios");

const {Temperament} = require("../db")

const {getDogsApi} = require("../controllers/dogsC")

const getTemperamentTypesApi = async () => {
    const DogsApi = await getDogsApi()
    
    const temperamentAllApi = DogsApi.map((e) => e.temperaments)
    const temperamentAll = [];

    temperamentAllApi.forEach((e) => e.forEach((eE) => temperamentAll.push(eE)));

    return [...new Set(temperamentAll)]
}

/*-------------------------------------------------------------------- */

const getTemperamentTypesDb = async () => {
    const temperamentAll = await Temperament.findAll({
        attributes: ["id","name"]
    });

    const temperamentsAllArray = [];

    temperamentAll.forEach((e) => temperamentsAllArray.push({name: e.name, id: xid}))

    return temperamentsAllArray;
}

/*-----------------------------------------------------------------------------------*/

const postTemperament = async () => {
    const temperamentTypes = await getTemperamentTypesApi();

    let allTemperamentTypes = temperamentTypes.map((e) => 
     Temperament.findOrCreate({ where: {name: e}})
    );
    Promise.all(allTemperamentTypes).then((e) => console.log("temperaments ok"))
};


 module.exports = { getTemperamentTypesDb, getTemperamentTypesApi, postTemperament}