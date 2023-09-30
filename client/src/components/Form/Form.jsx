import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../actions";
import { Link } from "react-router-dom";
import validations from "./validations";
import "../Form/Form.css";

const Form = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const [game, setGame] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    genres: [],
    rating: 0,
    released: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    rating: 0,
    description: "",
  });

  // const handleInputChange = (e) => {
  //   const property = e.target.name;
  //   const value = e.target.value;
  //   const updatedGame = { ...game, [property]: value };
  //   setGame(updatedGame);
  //   validations(updatedGame, errors, setErrors);
  // };
  // const handleInputChange = (e) => {
  //   const property = e.target.name;
  //   const value =
  //     e.target.name === "rating" ? parseFloat(e.target.value) : e.target.value;

  //   const updatedGame = { ...game, [property]: value };
  //   setGame(updatedGame);
  //   validations(updatedGame, errors, setErrors);
  // };
  const handleInputChange = (e) => {
    const property = e.target.name;
    let value = e.target.value;

    if (property === "rating") {
      value = parseFloat(value);
    } else if (property === "platforms") {
      // Si la propiedad es 'platforms', convierte el valor en un array con un solo elemento
      value = [value];
    }

    const updatedGame = { ...game, [property]: value };
    setGame(updatedGame);
    validations(updatedGame, errors, setErrors);
  };

  const handleMultiSelectChange = (e) => {
    const { value, checked } = e.target;

    setGame((prevGame) => {
      if (checked) {
        return {
          ...prevGame,
          genres: [...prevGame.genres, value],
        };
      } else {
        return {
          ...prevGame,
          genres: prevGame.genres.filter((genre) => genre !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(errors).every((error) => error === "")) {
        const gameData = {
          name: game.name,
          image: game.image,
          description: game.description,
          platforms: game.platforms,
          genres: game.genres,
          rating: game.rating,
          released: game.released,
        };
        console.log(gameData);
        console.log(2);
        console.log(gameData.length);
        return await axios.post("http://localhost:3001/videogame", gameData);
      }
    } catch (error) {
      console.error("Error creating videogame:", error);
      alert(
        "An error occurred while creating the videogame. Please try again later."
      );
    }
  };

  const randomPlatforms = [
    "PC",
    "Playstation 5",
    "Playstation 4",
    "Xbox One",
    "Nintendo Switch",
    "iOS",
    "Android",
  ];

  return (
    <div>
      <Link to="/home">
        <button className="btn-back">Back</button>
      </Link>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="title-container">
          <h1 className="form-title">Hey! Create a new Videogame</h1>
        </div>

        <div className="name-container">
          <label className="form-name">Name:</label>
          <input
            type="text"
            name="name"
            value={game.name}
            onChange={handleInputChange}
          />
          <p className="error-name">{errors.name}</p>
        </div>

        <div className="container-img-url">
          <label className="img-url">Image URL:</label>
          <input
            type="text"
            name="image"
            value={game.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="container-form-platforms">
          <label>Platforms:</label>
          <select
            name="platforms"
            value={game.platforms}
            onChange={handleInputChange}
          >
            {randomPlatforms.map((p) => (
              <option>{p}</option>
            ))}
          </select>
        </div>

        <div className="container-form-released">
          <label className="form-released">Released:</label>
          <input
            type="date"
            name="released"
            value={game.released}
            onChange={handleInputChange}
          />
        </div>
        <div className="container-form-description">
          <label className="form-description">Description:</label>
          <textarea
            className="textarea-description"
            name="description"
            value={game.description}
            onChange={handleInputChange}
          />
          <p className="error-description">{errors.description}</p>
        </div>

        <div className="container-form-rating">
          <label className="form-rating">Rating:</label>
          <input
            type="number"
            name="rating"
            value={game.rating}
            onChange={handleInputChange}
          />
          <p className="error-rating">{errors.rating}</p>
        </div>

        <div className="container-form-genre">
          <label className="form-genre">Genres:</label>
          {genres.map((genre) => (
            <label key={genre.id}>
              <input
                type="checkbox"
                value={genre}
                name="genres"
                checked={game.genres.includes(genre)}
                onChange={handleMultiSelectChange}
              />
              {genre}
            </label>
          ))}
        </div>
        <div className="container-form-btn">
          <button onSubmit={handleSubmit} className="btn-form">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
