// GET | /videogames/:idVideogame
// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.

const axios = require ("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY
 const { Videogame, Genre } = require("../db");
 const { json } = require("body-parser");
// "https://api.rawg.io/api/games/{id}";

const getVideogameById = async (req, res) => {
    const { idVideogame } = req.params;
    try {
      let videogame;
  
       if (idVideogame && idVideogame.length === 36) {
      //   // Si la longitud es 36, asumimos que es un UUID y lo buscamos en la base de datos local
      //   // videogame = await Videogame.findByPk(idVideogame, {
      //   //   include: Genre,
      //   // });
      //   const gameDB = await Videogame.findOne({ where: {id: idVideogame},
      //        include: {model: Genre, attributes: ['name'],
      //           through: {attributes: []}}});
      //           let X = gameDB
      //                         const information = {
      //                             id: X.idVideogame,
      //                             name: X.name,
      //                             image: X.image,
      //                             rating: X.rating,
      //                             description: X.description,
      //                             released: X.released,
      //                             platforms: X.platforms,
      //                             createdAt: X.createdAt,
      //                             updateAt: X.updatedAt,
      //                             genres: X.genres.map(p => p.name).join(', ')
      //                         }
      //                         console.log("db")
      //                         console.log(information);
      //                         return res.json(information)
      const gameDB = await Videogame.findOne({
        where: { id: idVideogame }, // Asegúrate de buscar por el campo correcto (idVideogame)
        include: [
          {
          model: Genre,
          attributes: ['name'],
         // through: { attributes: [] }
          }
        ]
      });
      if (gameDB) {
        const information = {
          id: gameDB.idVideogame, // Usa el campo correcto para el UUID
          name: gameDB.name,
          image: gameDB.image,
          rating: gameDB.rating,
          description: gameDB.description,
          released: gameDB.released,
          platforms: gameDB.platforms,
          createdAt: gameDB.createdAt,
          updatedAt: gameDB.updatedAt,
          genres: gameDB.genres ? gameDB.genres.map((genre) => genre.name || genre).join(', ') : '', // Verificar si genres existe antes de mapearlo
          
        };

        return res.json(information);
      } else {
        // De lo contrario, asumimos que es un juego de la API externa y lo buscamos en la API
        const url = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
        const response = await axios.get(url);
        videogame = response.data;
      }
    }
  
    if (videogame) {
        console.log(videogame);
        console.log("ola")
        const genres = videogame.genres ? videogame.genres.map((genre) => genre.name) : [];
        console.log("controllerId");
        console.log(genres);
        res.status(200).json({
          name: videogame.name,
          image: videogame.background_image,
          description: videogame.description_raw || videogame.description || "",
          released: videogame.released || "",
          rating: videogame.rating || 0,
          platforms: videogame.platforms ? videogame.platforms.map((platform) => platform.platform.name || platform.platform) : [],
          genres,
        });
        console.log("luego del envio del json");
        console.log(); 

      } else {
        res.status(404).send(`Videogame ${idVideogame} Not Found`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener detalle del Videojuego" +  error });
    }

}

  

// module.exports = getVideogameById;

// const getVideogameById = async (req, res) => {

//   const { id } = req.params;

//   try { 
//     if (id && id.includes("-")) {
//           const gameDB = await Videogame.findOne({ where: {id},
//               include: {model: Genre, attributes: ['name'],
//               through: {attributes: []}}})
//               let X = gameDB
//               const information = {
//                   id: X.id,
//                   name: X.name,
//                   image: X.image,
//                   rating: X.rating,
//                   description: X.description,
//                   released: X.released,
//                   platforms: X.platforms,
//                   createdAt: X.createdAt,
//                   updateAt: X.updatedAt,
//                   genres: X.genres.map(p => p.name).join(', ')
//               }
//               return res.json(information)
//       } else {
//           const gameAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                  
//               let X = gameAPI.data;
//               const information = {
//                   name: X.name,
//                   image: X.background_image,
//                   genres: X.genres && X.genres.map((p) =>
//                       p.name).filter(p => p != null).join(', '),
//                   description: X.description_raw,
//                   released: X.released,
//                   rating: X.rating,
//                   platforms: X.platforms && X.platforms.map((p) =>
//                       p.platform.name).filter(p => p != null).join(', ')
//               }
//               return res.json(information)
//       }
//   } catch (err) {
//       res.status(404).json({ message: "ID not found" + err })
//   }
// }

module.exports = getVideogameById;

