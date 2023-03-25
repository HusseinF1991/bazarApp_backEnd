const express = require("express");
const router = express.Router();
const Item = require("../../../model/item");
const Category = require("../../../model/category");
const ItemType = require("../../../model/itemType");
const Brand = require("../../../model/brand");
const ItemTypeImage = require("../../../model/itemTypeImage");
const ItemReview = require("../../../model/itemReview");
const Shop = require("../../../model/shop");
const InvoiceItem = require("../../../model/invoiceItem");
const { Sequelize } = require("sequelize");

router.get("/", (req, res) => {
  Item.findAll({
    include: [
      Category,
      {
        model: ItemType,
        where: { deleteFlag: 0 },
        include: [
          ItemTypeImage,
          {
            model: InvoiceItem,
            separate: true,
            required: false,
            group: "typeId",
            attributes: [
              [Sequelize.fn("MAX", Sequelize.col("createdAt")), "lastSellDate"],
              [Sequelize.fn("COUNT", Sequelize.col("id")), "numOfSells"],
              // [
              //   Sequelize.literal(
              //     `(SELECT Max(createdAt) FROM invoiceItems AS InvoiceItems WHERE typeId = ItemTypes.id limit 1)`
              //   ),
              //   "lastSellDate",
              // ],
              // [
              //   Sequelize.literal(
              //     `(SELECT count(id) FROM invoiceItems AS InvoiceItems WHERE typeId = ItemTypes.id limit 1)`
              //   ),
              //   "numOfSells",
              // ],
            ],
          },
        ],
      },
      Brand,
      ItemReview,
      Shop,
    ],
    where: { id: req.query.id },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
