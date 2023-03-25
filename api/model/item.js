const { DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const Shop = require("./shop");
const Category = require("./category");
const sequelizePaginate = require('sequelize-paginate');
const Brand = require("./brand");

const Item = sequelize.define(
  "Item",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    shopId: {
      type: DataTypes.BIGINT,
      // allowNull defaults to true
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      // allowNull defaults to true
    },
    brandId: {
      type: DataTypes.BIGINT,
      // allowNull defaults to true
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue : 0
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    tableName: "items",
  }
);

sequelizePaginate.paginate(Item)

Shop.hasMany(Item, { foreignKey: "shopId", onDelete: "RESTRICT" });
Item.belongsTo(Shop, { foreignKey: "shopId" });

Category.hasMany(Item, { foreignKey: "categoryId", onDelete: "RESTRICT" });
Item.belongsTo(Category, { foreignKey: "categoryId" });

Brand.hasMany(Item, { foreignKey: "brandId", onDelete: "RESTRICT" });
Item.belongsTo(Brand, { foreignKey: "brandId" });

// `sequelize.define` also returns the model
console.log(Item === sequelize.models.Item); // true

module.exports = Item;
