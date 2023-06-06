import axios from "axios"

import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_VALUE,
    FILTER_CREATED,
    FILTER_TEMPERAMENT,
    SEARCH_NAME,
    DOGS_DETAIL,
    POST_DOG,
    ORDER_NAME
    } from './actionsTypes'

    export function getDogs(){
        return async function(dispatch){
            let json = await axios.get('http://localhost:3001/dogs');
            return dispatch({
                type: GET_DOGS,
                payload: json.data
            })
        }
    }
    export function getTemperament() {
        return async function (dispach){
            let temp = await axios.get("http://localhost:3001/temperaments")
            return dispach({
                type: GET_TEMPERAMENTS,
                payload: temp.data,     
            })
        }
    }
/*---------------------------------filtros------------------------- */

export function orderByName(payload){
    return{
        type: ORDER_NAME,
        payload
    }
}

export function filterByValue(payload){
    return{
        type: FILTER_BY_VALUE,
        payload
    }
}


export function filterCreated(payload){
    console.log(payload)
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function filterTemperament(payload){
    return{
        type:FILTER_TEMPERAMENT,
        payload
    }
}
/*------------------------------------------------------------------- */
export function searchName (name){
    return async (dispatch)=>{
   try{
    const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
       return dispatch ({
           type: SEARCH_NAME,
           payload: json.data
       })
   }catch(err){
    return dispatch ({
        type: SEARCH_NAME,
        payload: []
    },)
   }
}}
/*---------------------------------- */

export function dogsDetail(id) {
    return async (dispatch)=>{
    const json = await axios.get(`http://localhost:3001/dogs/${id}`)
    return dispatch({
                type: DOGS_DETAIL,
                payload: json.data
            })  
    } 
}

/*------------------------------------------- */
export const postDog =({image, name, heightMin, heightMax, weightMin, weightMax, lifeSpan, temperaments }) =>{
    return async ( dispatch) =>{
            await axios.post('http://localhost:3001/dogs',{
                image,    
                name,
                height: heightMin + ' - ' +heightMax,
                weight: weightMin + ' - ' + weightMax,
                lifeSpan: lifeSpan + " years",
                temperaments,
            })
            dispatch({
                type: POST_DOG
            })
    }}
