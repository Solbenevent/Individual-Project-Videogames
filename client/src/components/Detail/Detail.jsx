import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetail } from "../../actions";
import "../Detail/Detail.css";

//"name, image, platforms, genre, description, released 

const Detail = () => {
  
  const { idVideogame } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector(store =>  store.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(idVideogame))
  }, [dispatch, idVideogame]);

  return (
    <div>
      <img classNanme = "img"src = {videogame.image} alt={videogame.name} />
      <h1>{videogame.name}</h1>
      <h3>{videogame.released}</h3>
      <h3>{videogame.genres}</h3>
      <h3>{videogame.rating}</h3>
      <h3>{videogame.platforms}</h3>
      <h4>{videogame.description}</h4>
      </div>
)
}

export default Detail;