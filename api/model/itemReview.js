const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const Item = require("./item");

const ItemReview = sequelize.define(
  "ItemReview",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      // allowNull defaults to true
    },
    reviewerName: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    customerId: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    readByManager: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    tableName: "itemReviews",
  }
);

Item.hasMany(ItemReview, { foreignKey: "itemId" });
ItemReview.belongsTo(Item, { foreignKey: "itemId" });

// `sequelize.define` also returns the model
console.log(ItemReview === sequelize.models.ItemReview); // true

module.exports = ItemReview;
