const { Router } = require('express');
const getVideogames = require("../controllers/getVideogames");
const createVideogame = require("../controllers/createVideogame");
const getVideogameById = require("../controllers/getVideogameById");
const getGamebyName = require("../controllers/getGamebyName");
const { fetchAndSaveGenres } = require ("../controllers/getGenres");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get("/videogames/:id", async (req, res) => {
//   const { id } = req.params; 
//   try {
//     const videogames = await getAPI_Info(id);
//     res.status(200).json(videogames);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// })

router.get("/videogames", getVideogames);

router.post("/videogame", createVideogame);

router.get("/videogames/:idVideogame", getVideogameById);

router.get("/videogames", getGamebyName);

router.get("/genres", fetchAndSaveGenres);

module.exports = router;
