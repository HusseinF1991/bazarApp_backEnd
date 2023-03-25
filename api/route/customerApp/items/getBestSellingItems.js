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
    // subQuery: false,
    attributes: [
      // include: [
      [Sequelize.fn("SUM", Sequelize.col("InvoiceItem.qty")), "sellsCount"],
      // ],
    ],
    group: "typeId",
    order: [[Sequelize.col("sellsCount"), "DESC"]],
    limit: 20,
    include: [
      // Category,
      {
        model: ItemType,
        required: true,
        where: { deleteFlag: 0 },
        include: [
          {
            model: Item,
            required: true,
            where: { deleteFlag: 0 },
            include: [
              {
                model: ItemReview,
                required: false,
                separate: true,
                // where: { readByManager: 0 },
                attributes: [
                  [Sequelize.fn("AVG", Sequelize.col("rate")), "avgRate"],
                ],
                group: "itemId",
              },
            ],
          },
          { model: ItemTypeImage, separate: true },
        ],
      },
    ],
  };
  InvoiceItem.findAll(options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
