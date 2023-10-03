import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../actions";
import { Link } from "react-router-dom";
import validations from "./validations";
import "../Form/Form.css";

const Form = () => {
  //react-redux
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  //hooks
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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  //handlers

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (Object.values(errors).every((error) => error === "")) {
  //       const gameData = {
  //         name: game.name,
  //         image: game.image,
  //         description: game.description,
  //         platforms: game.platforms,
  //         genres: game.genres,
  //         rating: game.rating,
  //         released: game.released,
  //       };
  //       console.log(gameData);
  //       console.log(222);
  //       // return await axios.post("http://localhost:3001/videogame", gameData);
  //       const response = await axios.post(
  //         "http://localhost:3001/videogame",
  //         gameData
  //       );
  //       console.log(response);
  //       if (response.status === 201) {
  //         setModalMessage(response.data.message);
  //         setModalType("success");
  //         setShowModal(true);
  //       }
  //       // Si hubo un error en la solicitud, muestra el modal de error
  //       setShowModal(true);
  //       setModalType("error");
  //       setModalMessage(
  //         "An error occurred while creating the videogame. Please try again later."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error creating videogame:", error);
  //     setModalMessage(
  //       error.response?.data?.message || "¡Lo siento! Ocurrió un Error"
  //     );
  //     setModalType("error");
  //     setShowModal(true);
  //   }
  // };

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

        // Realiza la solicitud para crear el juego
        const response = await axios.post(
          "http://localhost:3001/videogame",
          gameData
        );

        // Verifica si la solicitud fue exitosa (código de respuesta 201)
        if (response.status === 201) {
          // Si fue exitosa, muestra el modal de éxito
          setShowModal(true);
          setModalType("success");
          setModalMessage("The videogame was successfully created!");
        } else {
          // Si hubo un error en la solicitud, muestra el modal de error
          setShowModal(true);
          setModalType("error");
          setModalMessage(
            "An error occurred while creating the videogame. Please try again later."
          );
        }
      } else {
        // Si hay errores en el formulario, muestra el modal de error
        setShowModal(true);
        setModalType("error");
        setModalMessage("Please complete all required fields.");
      }
    } catch (error) {
      console.error("Error creating videogame:", error);
      // Si hubo un error inesperado, muestra el modal de error
      setShowModal(true);
      setModalType("error");
      setModalMessage(
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
      {showModal && (
        <div className={`modal ${modalType}`}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
