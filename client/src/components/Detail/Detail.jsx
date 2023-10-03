import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getVideogameDetail, clearDetail } from "../../actions";
import Loading from "../Loading/Loading";
//import "../Detail/Detail.css";

const Detail = () => {
  const { idVideogame } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((store) => store.videogameDetail);
  console.log(videogame);

  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame));
    dispatch(clearDetail());
  }, [dispatch, idVideogame]);

  return (
    // <div className="container-detail">
    //   <div>
    //     <Link to="/home">
    //       <button>Back</button>
    //     </Link>
    //   </div>
    //   <div className="container-detail-name">
    //     <h1 className="detail-name">{videogame.name}</h1>
    //   </div>
    //   <div className="container-img-detail">
    //     <img
    //       className="img-detail"
    //       src={videogame.image}
    //       alt={videogame.name}
    //     />
    //   </div>
    //   <div className="container-released">
    //     <h3 className="detail-released">{videogame.released}</h3>
    //   </div>
    //   <div className="container-genre-detail">
    //     <h3 className="detail-genre">{videogame.genres}</h3>
    //   </div>
    //   <div className="container-rating-detail">
    //     <h3 className="rating-detail">{videogame.rating}</h3>
    //   </div>
    //   <div className="container-platform-detail">
    //     <h3 className="platform-detail">{videogame.platforms}</h3>
    //   </div>
    //   <div className="container-description-detail">
    //     <h4 className="description-detail">{videogame.description}</h4>
    //   </div>
    // </div>
    <div className="detail-container">
      <div className="detail-image">
        {videogame.image === null || !videogame.image ? (
          <Loading image={"noimage"} />
        ) : (
          <img src={videogame.image} alt={videogame.name} />
        )}
        <div className="detail-title">
          <h1>{videogame.name}</h1>
          <h5>({videogame.released})</h5>
        </div>
      </div>
      <div className="detail-description">
        <h2>About this game:</h2>
        <p>{videogame.description}</p>
      </div>
      <div className="detail-genres">
        <p>Genres: {videogame?.genres}</p>
      </div>
      <div className="detail-rating">
        <p>Rating: {videogame.rating}</p>
      </div>
      <div className="detail-platforms">
        <p>Platforms: {videogame.platforms}</p>
      </div>
    </div>
  );
};

export default Detail;
