//import image from "../imagenes/videogame.png";
import image from "../../imagenes/videogame.png";
import { Link } from "react-router-dom";
import incon from "../../imagenes/arrow.png"; 
import "../Landing/Landing.css";
import welcome from "../../imagenes/welcome.png"
const Landing = () => {
  
    return (
        <div className="container">
            <div>
             <img src={welcome} alt="welcome" className="welcome"/>
            </div>
            <div>
            <img src = {image} alt="img" className="image"/>
            </div>
            <Link to = {"/home"}>
            <button className="button">
                <img src = {incon} alt= "arrow"className="icon"/>
            </button>
            </Link>
        </div>
    )
};

export default Landing;