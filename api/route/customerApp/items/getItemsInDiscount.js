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
    limit: 20,
    include: [
      {
        model: Item,
        required: true,
        where: { deleteFlag: 0 },
        include: [
          {
            model: ItemReview,
            separate: true,
            required: false,
            // where: { readByManager: 0 },
            attributes: [
              [Sequelize.fn("AVG", Sequelize.col("rate")), "avgRate"],
              // [
              //   Sequelize.literal(
              //     "(SELECT AVG(rate) FROM itemReviews AS ItemReview WHERE itemId = `Item.id`  limit 1)"
              //   ),
              //   "avgRate",
              // ],
            ],
            group: "itemId",
          },
        ],
      },
      { model: ItemTypeImage, separate: true },
    ],
    where: {
      deleteFlag: 0,
      discountPrice: { [Op.ne]: [0] },
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
