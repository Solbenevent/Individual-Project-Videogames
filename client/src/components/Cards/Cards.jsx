import VideogameCard from "../VideogameCard/VideogameCard";
import Loading from "../Loading/Loading";
import "../Cards/Cards.css";

const Cards = ({ videogames }) => {
  return (
    <div className="cards-container">
      {videogames.length > 0 ? (
        videogames.map((data) => (
          <VideogameCard
            key={data.id}
            id={data.id}
            name={data.name}
            image={data.image}
            genres={
              Array.isArray(data.genres)
                ? data.genres.map((genre) => genre).join(" / ")
                : data.genres
            }
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Cards;
