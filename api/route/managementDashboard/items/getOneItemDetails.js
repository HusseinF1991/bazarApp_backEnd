const express = require("express");
const router = express.Router();
const Item = require("../../../model/item");
const Category = require("../../../model/category");
const ItemType = require("../../../model/itemType");
const Brand = require("../../../model/brand");
const ItemTypeImage = require("../../../model/itemTypeImage");
const ItemReview = require("../../../model/itemReview");
const Shop = require("../../../model/shop");

router.get("/", (req, res) => {
  Item.findAll({
    include: [
      Category,
      { model: ItemType, where: { deleteFlag: 0 }, include: [ItemTypeImage] },
      Brand,
      ItemReview,
      Shop
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
