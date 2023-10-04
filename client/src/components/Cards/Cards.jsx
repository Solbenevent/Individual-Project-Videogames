import VideogameCard from "../VideogameCard/VideogameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
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
            genres={data?.genres}
          />
        ))
      ) : (
        <div className="spinner-container">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2x"
            style={{ color: "#4c007d" }}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
