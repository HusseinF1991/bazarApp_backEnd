const { DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");

const Category = sequelize.define("Category" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    catName: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    catLevel: {
      type: DataTypes.INTEGER,
      allowNull:false
      // allowNull defaults to true
    },
    parentCatId: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'categories'
  });

  // `sequelize.define` also returns the model
  console.log(Category === sequelize.models.Category); // true

  module.exports = Category;