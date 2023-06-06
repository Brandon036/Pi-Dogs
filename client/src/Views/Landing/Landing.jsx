import style from "./Landing.module.css"
import { Link } from "react-router-dom";

const Landing = () =>{

    return (
        <div className={style.Landing}>
            <h1>soy landing...</h1>
            <Link to="/home">
             Entra y ves perros
            </Link>
        </div>
    )
};
 export default Landing;