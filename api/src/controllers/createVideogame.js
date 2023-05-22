const { Videogame, Genre } = require("../db");
//const { Router } = require("express");
//const router = Router();

const createVideogame = async (req, res) => {
  try {
    const { name, description, platforms, image, released, rating, genres } = req.body;

    const videogame = await Videogame.create({
      name, 
      description,
      platforms, 
      image,
      released,
      rating
    });
    const genresToAdd = await Genre.findAll({ where: { name: genres }})
    await videogame.addGenres(genresToAdd);
    res.status(201).json(videogame); 
   
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports =
    createVideogame

