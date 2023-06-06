import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchName } from "../../Redux/actions" // Importar la acción correspondiente
import { Link } from 'react-router-dom';

function Nav() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  // Manejar el cambio en el input
  function handleInputChange(e) {
    setName(e.target.value);
  }

  // Manejar el envío del formulario
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchName(name)); // Despachar la acción con el nombre ingresado
  }

  return (
    <div>
      <form onSubmit={handleSubmit}> {/* Agregar el atributo onSubmit al formulario */}
      <h1>soy SearchNav</h1>
        <input
          value={name}
          type='text'
          placeholder='Find your doggie'
          onChange={handleInputChange}
        />

        <button type='submit'>Search</button> {/* Eliminar el evento onClick y cambiar el tipo a 'submit' */}
      </form>  
      <Link to={"/form"}><h1>Crear DOG</h1></Link>
    </div>
  );
}

export default Nav;

/*import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchName } from '../../actions/index';
import { Link } from 'react-router-dom';

const Nav = () =>{
    const dispatch = useDispatch();
    const [name , setName] = useState(''); 

    function handleInputChange(e){
        e.preventDefault(e);
        setName(e.target.value)
      }

    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(searchName(name))
      }
    return (
        <div>
            <input value={name}
            type='text'
            placeholder='Find your doggie'
            onChange={(e)=>handleInputChange(e)} />

            <button type='submit' 
             onClick={(e)=>handleSubmit(e)}>Search</button>

            <h2>Soy Nav</h2>
            <Link to={"/home"}><h1>home</h1></Link>
            <Link to={"/form"}><h1>Crear DOG</h1></Link>
        </div>
    )
 }
 export default Nav;*/
