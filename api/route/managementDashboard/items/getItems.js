const express = require("express");
const router = express.Router();
const Item = require("../../../model/item");
const Category = require("../../../model/category");
const ItemType = require("../../../model/itemType");
const Brand = require("../../../model/brand");
const ItemTypeImage = require("../../../model/itemTypeImage");
const ItemReview = require("../../../model/itemReview");

router.post("/", (req, res) => {
  // Or with extra options
  const options = {
    // subQuery: false,
    include: [
      Category,
      { model: ItemType, where: { deleteFlag: 0 }, include: [ItemTypeImage] },
      Brand,
      ItemTypeImage,
      {
        model: ItemReview,
        where: { readByManager: 0 },
        // attributes: [
          // [
          //   Sequelize.fn("COUNT", Sequelize.col("ItemReviews.itemId")),
          //   "reviewsCount",
          // ],
        // ],
        required: false,
      },
    ],
    // attributes: {
    //   include: [
    //     [
    //       Sequelize.fn("COUNT", Sequelize.col("ItemReviews.itemId")),
    //       "reviewsCount",
    //     ],
    //   ],
    // },
    page: req.body.pageNum, // Default 1
    paginate: 25, // Default 25
    // order: [["name", "DESC"]],
    where: { shopId: req.body.shopId, deleteFlag: 0 },
  };
  Item.paginate(options)
    .then(({ docs, pages, total }) => {
      res.send({ docs: docs, pages: pages, total: total });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
