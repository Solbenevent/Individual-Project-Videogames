const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
       type: DataTypes.INTEGER,
       //defaultValue: DataTypes.UUIDV4,
       autoIncrement: true,
       primaryKey: true,
       
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms: {
     type: DataTypes.STRING,
     
    },
    image: {
      type: DataTypes.STRING,
     
    },
    released: {
      type: DataTypes.STRING,
      
    },
    rating: {
      type: DataTypes.DECIMAL(2,1),
    }
  })

};
