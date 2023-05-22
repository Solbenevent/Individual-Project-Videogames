// GET | /genres
// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
const axios = require("axios");
const { Genre } = require("../db");
require("dotenv").config();
const  API_KEY  = process.env.API_KEY;

const getDataApi = async () => {
  try {
    const response = await axios.get
    (`https://api.rawg.io/api/genres?page=1&key=${API_KEY}`)
    return response.data.results.map((genre) => genre.name);
  } catch (error) {
    throw Error("Error al obtener los nombres de la API");
  }
}

const savedGenres = async (genres) => {
  try {
    await Genre.bulkCreate(
      genres.map((name) => ({ name })),
      {ignoreDuplicates: true }
    );

  } catch (error) {
    throw Error("Error saving genres to database");
  }
}

const fetchAndSaveGenres = async (req, res) => {
  try {
    const genres = await getDataApi();
    await savedGenres(genres);
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error"});
  }
}

module.exports = {
  fetchAndSaveGenres
}
    

