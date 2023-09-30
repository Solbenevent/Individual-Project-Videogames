const { DataTypes, UUID, UUIDV4, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require("uuid"); 
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
       type: DataTypes.UUID,
       defaultValue: Sequelize.UUIDV4,
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
     type: DataTypes.ARRAY(DataTypes.JSON)
     //type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
     
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL(2,1),
    },
  })

};
