import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getVideogameDetail, clearDetail } from "../../actions";
import "../Detail/Detail.css";

//"name, image, platforms, genre, description, released

const Detail = () => {
  const { idVideogame } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((store) => store.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame));
    dispatch(clearDetail());
  }, [dispatch, idVideogame]);

  return (
    <div className="container-detail">
      <div>
        <Link to="/home">
          <button>Back</button>
        </Link>
      </div>
      <div className="container-detail-name">
        <h1 className="detail-name">{videogame.name}</h1>
      </div>
      <div className="container-img-detail">
        <img
          className="img-detail"
          src={videogame.image}
          alt={videogame.name}
        />
      </div>
      <div className="container-released">
        <h3 className="detail-released">{videogame.released}</h3>
      </div>
      <div className="container-genre-detail">
        <h3 className="detail-genre">{videogame.genres}</h3>
      </div>
      <div className="container-rating-detail">
        <h3 className="rating-detail">{videogame.rating}</h3>
      </div>
      <div className="container-platform-detail">
        <h3 className="platform-detail">{videogame.platforms}</h3>
      </div>
      <div className="container-description-detail">
        <h4 className="description-detail">{videogame.description}</h4>
      </div>
    </div>
  );
};

export default Detail;
