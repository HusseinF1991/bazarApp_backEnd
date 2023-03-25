const express = require("express");
const router = express.Router();
const Item = require("../../../model/item");
const Category = require("../../../model/category");
const ItemType = require("../../../model/itemType");
const Brand = require("../../../model/brand");
const ItemTypeImage = require("../../../model/itemTypeImage");
const ItemReview = require("../../../model/itemReview");
const InvoiceItem = require("../../../model/invoiceItem");
const { Sequelize, Op } = require("sequelize");
const resources = require("../../../../config/resource");

router.get("/", (req, res) => {
  // Or with extra options
  const options = {
    subQuery: false,
    order: [["updatedAt", "DESC"]],
    // limit: 20,
    include: [
      {
        model: ItemReview,
        required: false,
        separate: true,
        // where: { readByManager: 0 },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("rate")), "avgRate"]],
        group: "itemId",
      },
      {
        model: ItemType,
        where: { deleteFlag: 0 },
        order: [["updatedAt", "DESC"]],
        limit: 1,
        include: { model: ItemTypeImage, separate: true },
        required: true,
      },
    ],
    where: {
      deleteFlag: 0,
      itemName: { [Op.like]: `${req.query.itemName}%` },
    },
  };
  Item.findAll(options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
