import { 
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_VALUE,
    FILTER_CREATED,
    FILTER_TEMPERAMENT,
    SEARCH_NAME,
    DOGS_DETAIL,
    POST_DOG,
    ORDER_NAME,
    } from './actionsTypes';

 const initialState = {
    dogs: [],
    backupDogs: [],
    temperaments: [],
    detail: [],
     }

    function rootReducer(state = initialState, action) {
    switch (action.type) {
          case GET_DOGS:
            return {
              ...state,
              dogs: action.payload,
              backupDogs: action.payload
            };
          case GET_TEMPERAMENTS:
            return{
              ...state,
              temperaments: action.payload
            };
      
          case ORDER_NAME:
            let sortedArr = action.payload === "AZ" ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1; 
              }
                return 0;
              })
                :  state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
                return 0;
              });
                return {
                  ...state,
                  dogs: sortedArr,
                };
                         
               case FILTER_BY_VALUE:
               let sortedArr3 = action.payload === "High" ? state.dogs.sort(function (a, b) {
              if (Number(a.height.split("-")[0]) > Number(b.height.split("-")[0])) {
                return -1;
              }
              if ( Number(b.height.split("-")[0]) > Number(a.height.split("-")[0])) {
                return 1;
              }
                return 0;
              })
                :  state.dogs.sort(function (a, b) {
                if (Number(a.height.split("-")[0]) > Number(b.height.split("-")[0])) {
                  return 1;
                }
                if (Number(b.height.split("-")[0]) > Number(a.height.split("-")[0])) {
                  return -1;
                }
                  return 0;
                });
                  return {
                    ...state,
                    dogs: sortedArr3,
                  };
             
                 
    
                  case FILTER_CREATED:  
                  const prueba = state.backupDogs;
                  let createFilter;
                  
                  if (action.payload === 'ALL') {
                    createFilter = prueba;
                  } else {
                    createFilter = action.payload === 'CREATED'
                      ? prueba.filter((e) => e.created)
                      : prueba.filter((e) => !e.created);
                  }
                  
                  return {
                    ...state,
                    dogs: createFilter
                  };

                 case FILTER_TEMPERAMENT:
                  let allDogs = state.backupDogs;
                 let temperamentFilter = action.payload === "ALL" ? allDogs 
                 : allDogs.filter((dog) => dog.Temperaments?.includes(action.payload));
                 return {
                  ...state,
                  dogs: temperamentFilter,
                   };
             
                case SEARCH_NAME: 
                 return{
                 ...state,
                 dogs: action.payload
                 }
             
                 case DOGS_DETAIL:
                 return{
                 ...state,
                 detail: action.payload
                 };
      
                 case POST_DOG:
                 return{
                 ...state
                }
                default:
                return state    
            }
      }
              
      export default rootReducer;