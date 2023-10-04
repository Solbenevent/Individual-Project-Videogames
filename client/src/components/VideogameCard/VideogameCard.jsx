//import "../VideogameCard/VideogameCard.css";
// import "../VideogameCard/VideogameCards.css";
// import { useNavigate } from "react-router-dom";

// const VideogameCard = ({ id, name, genres, image }) => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate(`/detail/${id}`);
//   };

//   return (
//     <div className="div-card" onClick={handleNavigate}>
//       <h3 className="card-name">{name}</h3>
//       <p className="card-genre">{genres}</p>
//       <img src={image} alt={name} className="img-cards" />
//     </div>
//   );
// };

// export default VideogameCard;

import "../VideogameCard/VideogameCards.css";
import { useNavigate } from "react-router-dom";

const VideogameCard = ({ id, name, genres, image }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="div-card" onClick={handleNavigate}>
      <div className="img-container">
        <img src={image} alt={name} className="img-cards" />
      </div>
      <div className="overlay">
        <h3 className="card-name">{name}</h3>
        <p className="card-genre">Genres: {genres}</p>
      </div>
    </div>
  );
};

export default VideogameCard;
