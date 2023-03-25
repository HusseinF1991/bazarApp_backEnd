const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");

const Brand = sequelize.define("Brand" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull:false,
      // unique: true
      // allowNull defaults to true
    },
    brandLogo: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue: 0
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'brands'
  });

  // `sequelize.define` also returns the model
  console.log(Brand === sequelize.models.Brand); // true

  module.exports = Brand;