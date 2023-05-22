// GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.

const axios = require ("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY
//require("dotenv").config();

const { Videogame, Genre } = require("../db");
"https://api.rawg.io/api/games/{id}";

const getVideogameById = async (req, res) => {
    const { idVideogame } = req.params;
    try {
    let videogame;
    if(idVideogame) {
      const url = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
      const response = await axios.get(url);
      videogame = response.data;
    } else {
        videogame = await Videogame.findByPk(idVideogame, {
            include: Genre
        });
    }
    if(videogame) {
        const genres = videogame.genres ? videogame.genres.map(genre => genre.name) : [];
        res.status(200).json({
            name: videogame.name,
            image:videogame.background_image,
            description: videogame.description_raw || videogame.description || "",
            released: videogame.released || "",
            rating: videogame.rating || 0,
            platforms: videogame.platforms ? videogame.platforms.map(platform => platform.platform.name) : [],
            genres
        });
    } else {
        res.status(404).send(`Videogame ${idVideogame} Not Found`);
    }
  } catch (error) {
    res.status(500).send("Error al obtener detalle del Videojuego");
  }
}

  

module.exports = getVideogameById;
