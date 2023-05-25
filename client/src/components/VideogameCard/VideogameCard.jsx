//import "../VideogameCard/VideogameCard.css";
import "../VideogameCard/VideogameCards.css";
import { Link } from "react-router-dom";

const VideogameCard = ({data}) => {
  return (
    <div className="card">  
    <Link to = {`/detail/${data.id}`}> 
    <h3 className="card-name">{data.name}</h3>
    </Link>
    <p className="card-genre">
        {data.genres.map((genre) => (
            <p key ={genre.id}>{genre.name}</p>
        ))}
        </p>
    <img src={data.image} alt={data.name}
    className="img-cards"/>
    </div>
  )
};

export default VideogameCard;