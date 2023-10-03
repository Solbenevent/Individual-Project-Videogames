
const axios = require('axios');
const { Videogame, Genre } = require("../db");
require("dotenv").config();
API_KEY = process.env.API_KEY;

const getVideogames = async (req, res) => {
    let apiGames = []; 
    try {
       const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
       const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
       const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
       const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
       const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
       apiGames = url1.data.results.concat(url2.data.results, url3.data.results, url4.data.results, url5.data.results);

       apiGames = apiGames.map(game => {
                   const platforms = game.platforms?.map(platform => platform.platform.name);
                   const genres = game.genres?.map(genre => genre.name); 
                   return {
                       id: game.id,
                       name: game.name,
                       image: game.background_image,
                       genres: genres,
                       platforms: platforms,
                       rating: game.rating,
                       released: game.released,
                       created: false
                   }
               });
            
               const dbGames = await Videogame.findAll({
                include: [
                    {
                        model: Genre,
                        attributes: ['name'], // Selecciona solo el nombre del género
                    }
                ],
            });
    
               const allGames = [...apiGames, ...dbGames];
               return res.status(200).json(allGames); 
    } catch (error) {
        return res.status(500).json({ message: "Couldn't get data from API", error});
    }
}

module.exports = getVideogames