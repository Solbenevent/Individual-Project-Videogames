const { Videogame, Genre } = require("../db");

const createVideogame = async (req, res) => {
  const {
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres,
  } = req.body; 

  try {
    if(!name || !description || !platforms || !image || !released || !rating || !genres) 
    return res.status(400).json({ message: "You must complete all fields"});

    const videogameCreated = await Videogame.create({
      name,
      description,
      platforms,
      image,
      released,
      rating,
      created: true
    });
    console.log(videogameCreated);

    const genreDB = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    videogameCreated.addGenre(genreDB); 

    return res.status(201).json({ message: "¡The videogame was successfully created!"})
  } catch (error) {
    console.log(error); 
    return res.status(500).json({ message: "Sorry, something went wrong", error}); 
  }


}


module.exports =
    createVideogame
    
