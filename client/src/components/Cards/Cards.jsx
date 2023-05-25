import VideogameCard from "../VideogameCard/VideogameCard";
import Loading from "../Loading/Loading";
import "../Cards/Cards.css";

const Cards = ({videogames}) => {
    return (
        <div className="cards-container">
          {videogames.length > 0 ?
          videogames.map((data) => (<VideogameCard key={data.id} data={data} />))
          : <Loading />
          }
        </div>
      );
};

export default Cards;
