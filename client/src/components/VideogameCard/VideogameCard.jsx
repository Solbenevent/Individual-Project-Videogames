//import "../VideogameCard/VideogameCard.css";
import "../VideogameCard/VideogameCards.css";
import { Link } from "react-router-dom";

const VideogameCard = ({id, name, genres, image }) => {
  return (
    <div className="card">  
    <Link to = {`/detail/${id}`}> 
    <h3 className="card-name">{name}</h3>
    </Link>
    <p className="card-genre">
       {genres}
        </p>
    <img src={image} alt={name}
    className="img-cards"/>
    </div>
  )
};

export default VideogameCard;