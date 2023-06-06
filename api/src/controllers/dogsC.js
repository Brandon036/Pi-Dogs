const axios = require("axios")
const {Dog, Temperament } = require("../db")


const getDogsApi = async()=>{
    const dApi = await axios.get(
        'https://api.thedogapi.com/v1/breeds'
    )
    return dApi.data.map((e) => {
         return{
            id: e.id,
            name: e.name,
            image: e.image.url,
            height: e.height,
            weight: e.weight,
            temperament: Array.isArray(e.temperament) ? e.temperament.map((e) => e) : []

         }
    });
};
/*----------------------------------------------------------------------------------- */
const getDogsdb = async () =>{
    const dogsDb = await Dog.findAll({
        attributes: ["id", "name", "image","height", "weight"],
        include: {model: Temperament},
    })
    return await dogsDb.map((ele) => {
        return {
            id: ele.dataValues.id,
            name: ele.dataValues.name,
            image: ele.dataValues.image,
            height: ele.dataValues.height,
            weight: ele.dataValues.weight,
            temperament: ele.dataValues.map((ele) => ele.name),
        }
    })
}
/*----------------------------------------------------------------------------------- */
const getDogsById = async (id) =>{

    const source = isNaN(id) ? "bdd" : "api";

    if(source === "api"){
        const dogs = await axios.get(
            `https://api.thedogapi.com/v1/breeds/${id}api_key={live_I0mecXngTrg8vM8I1oIIQTiTAYuZFxv40tkBEkt6v1omlG6ALTHf7EsPLgLoMEzN`
        )
        return{
            id: dogs.data.id,
            name: dogs.data.name,
            image: dogs.data.image,
            height: dogs.data.height,
            weight: dogs.data.weight,
            temperament: dogs.data.temperament,
        }
    }
}
module.exports = { getDogsApi, getDogsdb, getDogsById}