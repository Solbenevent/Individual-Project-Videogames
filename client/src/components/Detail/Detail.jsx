import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getVideogameDetail, clearDetail } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "../Detail/Detail.css";

const Detail = () => {
  const { idVideogame } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((store) => store.videogameDetail);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame));
    dispatch(clearDetail());
  }, [dispatch, idVideogame]);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const containerClasses = `detail-container ${showMore ? "expanded" : ""}`;

  return (
    <div>
      <Link to="/home" className="back-button">
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          beat
          size="xl"
          style={{ color: "#4c007d" }}
        />
      </Link>
      <div className={containerClasses}>
        <div className="detail-image">
          {videogame.image === null || !videogame.image ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="2x"
              style={{ color: "white" }}
            />
          ) : (
            <img src={videogame.image} alt={videogame.name} />
          )}
        </div>
        <div className="detail-info">
          <div className="detail-title">
            <h1 className="detail-name">{videogame.name}</h1>
            <h5 className="detail-released">({videogame.released})</h5>
          </div>
          <div className="detail-genres">
            <p className="p-genres">
              <strong>Genres:</strong> {videogame?.genres}
            </p>
          </div>
          <div className="detail-rating">
            <p>
              <strong>Rating:</strong> {videogame.rating}
            </p>
          </div>
          <div className="detail-platforms">
            <p>
              <strong>Platforms:</strong> {videogame.platforms}
            </p>
          </div>
          <div className="detail-description">
            {videogame.description ? (
              <div>
                <h2>About this game:</h2>
                {showMore ? (
                  <div>
                    <p>{videogame?.description}</p>
                    <button onClick={toggleDescription}>Ver menos</button>
                  </div>
                ) : (
                  <div>
                    <p className="detail-description">
                      {videogame?.description.slice(0, 200)}...
                    </p>
                    <button onClick={toggleDescription}>Ver más</button>
                  </div>
                )}
              </div>
            ) : (
              <p>Descripción no disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
