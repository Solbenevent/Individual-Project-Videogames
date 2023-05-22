//import "../VideogameCard/VideogameCard.css";
import "../VideogameCard/VideogameCards.css";
import { Link } from "react-router-dom";

const VideogameCard = ({data}) => {
  return (
    <div>
    <button>X</button>
    <Link to = {`/detail/${data.id}`}>
      
    <h3>{data.name}</h3>
    </Link>
    <p>
        {data.genres.map((genre) => (
            <span key ={genre.id}>{genre.name}</span>
        ))}
        </p>
    <img src={data.image} alt={data.name}
    className="img"/>
    </div>
  )
};

export default VideogameCard;