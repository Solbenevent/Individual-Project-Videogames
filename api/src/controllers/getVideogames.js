//const { Videogame } = require("../db"); 
 const axios = require('axios');
// const URL = "https://api.rawg.io/api/games";

require("dotenv").config();
API_KEY = process.env.API_KEY;
const getVideogames = async (req, res) => {
   
    
    try {
        let apiGames = [];

        const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
        const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
        const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
        const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
        const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
        apiGames = url1.data.results.concat(url2.data.results, url3.data.results, url4.data.results, url5.data.results);

        apiGames = apiGames.map(game => {
            const platforms = game.platforms?.map(platform => platform.name)
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres,
                platforms: platforms,
                rating: game.rating,
                released: game.released
            }
        });
        res.status(200).json(apiGames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
}


module.exports = getVideogames