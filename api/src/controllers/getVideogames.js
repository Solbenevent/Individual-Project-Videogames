
const axios = require('axios');
const { Videogame } = require("../db");
require("dotenv").config();
API_KEY = process.env.API_KEY;
// const getVideogames = async (req, res) => {

//    const genero = req.query.genre ? req.query.genre : false;
//    const origin = req.query.origin ? req.query.origin : "api"

//    try {
//        let apiGames = [];
//    if(origin === "api") {
//        const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
//        const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
//        const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
//        const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
//        const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
//        apiGames = url1.data.results.concat(url2.data.results, url3.data.results, url4.data.results, url5.data.results);

//        apiGames = apiGames.map(game => {
//            const platforms = game.platforms?.map(platform => platform.name)
//            return {
//                id: game.id,
//                name: game.name,
//                image: game.background_image,
//                genres: game.genres,
//                platforms: platforms,
//                rating: game.rating,
//                released: game.released
//            }
//        });
//    } else {
//        apiGames = await Videogame.findAll();
//        apiGames = apiGames.map((game) => {
//            const gameGenre = game.genres.split(",") 
//            game.genres = gameGenre.map((gen) => {
//                return {
//                    name: gen,
//                }
//            })
//            return game;
//        })
//    }
//        if (genero) { 
//            apiGames = apiGames.filter(game => game.genres.find(game =>  game.name === genero ));
//        }
//        res.status(200).json(apiGames);
//    } catch (error) {
//        res.status(500).json({ error: error.message });
//    }
  
// }
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
               return res.status(200).json(apiGames); 
    } catch (error) {
        return res.status(500).json({ message: "Couldn't get data from API", error});
    }
}

module.exports = getVideogames