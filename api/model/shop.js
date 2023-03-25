const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");

const Shop = sequelize.define("Shop" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
      // allowNull defaults to true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    specialty: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    profitRate: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    mobile: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    location: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    lat: {
      type: DataTypes.DOUBLE(10,2),
      // allowNull defaults to true
    },
    lng: {
      type: DataTypes.DOUBLE(10,2)
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'shops'
  });
  
  // `sequelize.define` also returns the model
  console.log(Shop === sequelize.models.Shop); // true

  module.exports = Shop;