
const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const { Op } = require("sequelize");

const getGamebyName = async (req, res) => {
    try {
      const { name } = req.query;
      const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
        params: { 
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
            [Op.iLike]: `%${name}%`, // <- aquí usas `%` al final del valor de búsqueda
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
        res.status(404).json({message: "No se encontraron videojuegos"});
      } else {
        res.status(200).json(videogames);
      }
      console.log(videogames); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getGamebyName;
  