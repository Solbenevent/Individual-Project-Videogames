import VideogameCard from "../VideogameCard/VideogameCard";
import Loading from "../Loading/Loading";

const Cards = ({videogames}) => {
    return (
        <div className="showing">
          {videogames.length > 0 ?
          videogames.map((data) => (<VideogameCard key={data.id} data={data} />))
          : <Loading />
          }
        </div>
      );
};

export default Cards;
