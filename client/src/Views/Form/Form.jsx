 import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
 import { Link } from "react-router-dom";
import { postDog, getTemperament } from "../../Redux/actions";

 const Form = () =>{
    
    const [input, setInput] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        image: "",
        temperaments: [],
    });
    /*--------------------ERRORES-------------------- */
    const [errors, setErrors] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        image: "",
    })

   const handleChange = (event) =>{
    setInput({
        ...input,
        [event.target.name]: event.target.value
    })
    validate({
        ...input,
        [event.target.name]: event.target.value
    })
    }
 /*------------------------------------backend a redux a aqui--------------------- */
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getTemperament())
    }, [dispatch]);

    const allTemperaments = useSelector((state) => state.temperaments)

    function handleSelect(e) {
      if (!input.temperaments.includes(e.target.value)) {
          setInput({
              ...input,
              temperaments: [...input.temperaments, e.target.value]
          })
      }
  }

/*------------------------- */
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(postDog(input))
      console.log(input)
    }
    /*--------------------Validate-------------------- */
    const validate = (input) => {
        let updatedErrors = {...errors};
      
        if (input.name === "") {
          updatedErrors.name = "El nombre de la raza es obligatorio";
        } else {
          updatedErrors.name = "";
        }
      
        if (input.heightMin === "") {
          updatedErrors.heightMin = "La altura mínima es obligatoria";
        } else {
          updatedErrors.heightMin = "";
        }
      
        if (input.heightMax === "") {
          updatedErrors.heightMax = "La altura máxima es obligatoria";
        } else {
          updatedErrors.heightMax = "";
        }
      
        if (input.heightMin && input.heightMax && parseInt(input.heightMin) >= parseInt(input.heightMax)) {
          updatedErrors.heightMax = "La altura máxima debe ser mayor que la altura mínima.";
        } else {
          updatedErrors.heightMax = "";
        }
      
        if (input.weightMin === "") {
          updatedErrors.weightMin = "El peso mínimo es obligatorio";
        } else {
          updatedErrors.weightMin = "";
        }
      
        if (input.weightMax === "") {
          updatedErrors.weightMax = "El peso máximo es obligatorio";
        } else {
          updatedErrors.weightMax = "";
        }
      
        if (input.weightMin && input.weightMax && parseInt(input.weightMin) >= parseInt(input.weightMax)) {
          updatedErrors.weightMin = "El peso máximo debe ser mayor que el peso mínimo.";
        } else {
          updatedErrors.weightMin = "";
        }
      
        if (input.lifeSpan === "") {
          updatedErrors.lifeSpan = "El tiempo de vida es obligatorio";
        } else {
          updatedErrors.lifeSpan = "";
        }
      
        setErrors(updatedErrors);
      }
    /*-----------------Solo se puede enviar hasta que no haya ningun error---------------- */
    const disable = () =>{
        let disabled = true;
        for(let error in errors){
          if(errors[error] === "") disabled = false;
          else{
            disabled = true
            break;
          }
        }
        return disabled
      }
   


    return (
        <div>
          <Link to={"/home"}>Devolver</Link>
            <h2>CREA TU PERRO</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="">Nombre:</label>
                    <input 
                    name="name"
                    type="text"
                    value={input.name} 
                    onChange={handleChange}
                    placeholder=" Nombre de La Raza"
                    />
                    
                    {errors.name}
                </div>
                <div>
                    <label htmlFor="">Altura Min:</label>
                    <input 
                    name="heightMin" 
                    type="number"
                    value={input.heightMin} 
                    onChange={handleChange}
                    placeholder="Altura minima cm o m"
                    min={0}
                    />
                        <select >  
                           <option value="metros">Metros</option>
                           <option value="centimetros">Centímetros</option>
                        </select>
                    {errors.heightMin}
                </div>
                <div>
                    <label htmlFor="">Altura Max:</label>
                    <input 
                    name="heightMax" 
                    type="number" 
                    value={input.heightMax}
                    onChange={handleChange}
                    placeholder="Altura maxima cm o m"
                    min={0}
                    />
                         <select>  
                           <option value="metros">Metros</option>
                           <option value="centimetros">Centímetros</option>
                        </select>
                    {errors.heightMax }
                </div>
                <div>
                    <label htmlFor="">Peso Minimo:</label>
                    <input 
                    name="weightMin" 
                    type="number"  
                    value={input.weightMin} 
                    onChange={handleChange}
                    placeholder="Peso minimo en g o kg"
                    min={0}
                    />
                         <select>  
                           <option value="gramos">Gramos</option>
                           <option value="Kilogramos">Kilogramos</option>
                        </select>
                    {errors.weightMin}
                </div>
                <div>
                    <label htmlFor="">Peso Max:</label>
                    <input 
                    name="weightMax" 
                    type="number" 
                    value={input.weightMax} 
                    onChange={handleChange}
                    placeholder="Peso maximo en g o kg"
                    min={0}
                    />
                        <select>  
                           <option value="gramos">Gramos</option>
                           <option value="Kilogramos">Kilogramos</option>
                        </select>
                    {errors.weightMax }
                </div>
                <div>
                    <label htmlFor="">Años:</label>
                    <input 
                    name="lifeSpan" 
                    type="number" 
                    value={input.lifeSpan} 
                    onChange={handleChange}
                    placeholder="Edad"
                    min={0}
                    />
                         <select>  
                           <option value="meses">Mes</option>
                           <option value="años">Año</option>
                        </select>
                    {errors.lifeSpan}
                </div>
                <div>
                    <label htmlFor="">imagen:</label>
                    <input 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    value={input.image} 
                    onChange={handleChange}/>
                    {errors.image}
                </div>
                <div>
                    <select onChange={e => handleSelect(e)}>
                    <option value="selected" hidden >Temperaments</option>
                    {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1
                                if (a.name > b.name) return 1
                                return 0
                            }).map(temp => {
                                return (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                )
                            })}
                    </select>
                </div>
            

                <button disabled={disable()} type="submit">Crear</button>
            </form>
        </div>
    )
 }
 export default Form;