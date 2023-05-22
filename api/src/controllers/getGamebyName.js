// GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");



const getGamebyName = async (req, res) => {
    try {
      const { name } = req.query;
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: "7a58c32e70024449b42b6c5e017d019d",
          search: name,
          page_size: 15,
        },
      });
      const videogamesAPI = response.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          description: game.description,
          platforms: game.platforms
            .map((platform) => platform.platform.name)
            .join(", "),
          image: game.background_image,
          released: game.released,
          rating: game.rating,
          genres: game.genres.map((genre) => genre.name).join(", "),
        };
      });
      const videogamesDB = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}%`, // <- aquí usas `%` al final del valor de búsqueda
          },
        },
        attributes: [
          "id",
          "name",
          "description",
          "platforms",
          "image",
          "released",
          "rating",
        ],
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
        limit: 15,
      });
      const videogames = [...videogamesAPI, ...videogamesDB];
      if (videogames.length === 0) {
        res.status(404).send("No se encontraron videojuegos");
      } else {
        res.status(200).json(videogames);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getGamebyName;
  