// Nombre.
// Imagen.
// Descripción.
// Plataformas. //
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
// Botón para crear el nuevo videojuego.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame } from "../../actions";
import validations from "./validations"
 
const Form = () => {
  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();
  
   useEffect(() => {
     dispatch(getGenres());
   }, [])

  const [game, setGame] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    genres: [],
    rating: 0,
    released: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    rating: 0,
    description: "",
  });

  const handleInputChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    const updatedGame = {...game, [property]: value};
    setGame(updatedGame);
    validations(updatedGame, errors, setErrors);

  }

  const handleSubmit = () => {
    if (Object.values(errors).every((error) => error === "")) {
      dispatch(createVideogame(game));
      return alert("Videogame created successfully!");
    }
    return alert("Sorry, something went wrong");
  };
  

  const randomPlatforms = [
    "PC",
    "Playstation 5",
    "Playstation 4",
    "Xbox One",
    "Nintendo Switch",
    "iOS",
    "Android"
  ]

  
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    const isChecked = event.target.checked;

    setGame((prevGame) => {
      if (isChecked) {
        return { ...prevGame, genres: [...prevGame.genres, genre] };
      } else {
        return {
          ...prevGame,
          genres: prevGame.genres.filter((selectedGenre) => selectedGenre !== genre)
        };
      }
    });
  };

  return (
    <div>
        <div>
            <h1>Hey! Create a new Videogame</h1>
        </div>

        <div>
        <label>Name:</label>
        <input
        type="text"
        name="name"
        value={game.name}
        onChange={handleInputChange} />
        <p>{errors.name}</p>
        </div>

        <div>
            <label>Image URL:</label>
            <input
            type="text"
            name="image"
            value={game.image}
            onChange={handleInputChange} />
        </div>

        <div>
            <label>Platforms:</label>
            <select name="platforms" value={game.platforms} onChange={handleInputChange}>
                {randomPlatforms.map((p) => (
                    <option>{p}</option>
                ))}
            </select>
        </div>

        <div>Released:</div>
        <input
        type="date"
        name="released"
        value={game.released}
        onChange={handleInputChange} />

        <div>
            <label>Description:</label>
            <textarea
            name="description"
            value={game.description}
            onChange={handleInputChange} />
            <p>{errors.description}</p>
        </div>

        <div>
            <label>Rating:</label>
            <input
            type="number"
            name="rating"
            value={game.rating}
            onChange={handleInputChange} />
            <p>{errors.rating}</p>
        </div>

        <div>
            <label>Genres:</label>
            {genres.map((genre) => (
  <label key={genre.id}>
    <input
      type="checkbox"
      value={genre.name}
      name="genres"
      checked={game.genres[genre]}
      onChange={handleGenreChange}
    />
    {genre}
  </label>
))}
        </div>
        <div>
            <button onClick={handleSubmit}>Create</button>
        </div>
    </div>
  )
}
export default Form;