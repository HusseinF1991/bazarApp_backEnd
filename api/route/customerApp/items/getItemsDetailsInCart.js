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

router.post("/", (req, res) => {
  console.log(JSON.parse(req.body.typesIds));
  // Or with extra options
  const options = {
    include: [
      {
        model: Item,
        where: { deleteFlag: 0 },
      },
      ItemTypeImage,
    ],
    where: {
      deleteFlag: 0,
      id: { [Op.in]: JSON.parse(req.body.typesIds) },
    },
  };
  ItemType.findAll(options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
