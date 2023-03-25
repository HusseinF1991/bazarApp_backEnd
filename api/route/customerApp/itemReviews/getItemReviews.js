const express = require("express");
const router = express.Router();
const ItemReview = require("../../../model/itemReview");

router.get("/", (req, res) => {
  ItemReview.findAll({
    where: {
      itemId: req.query.itemId,
    },
  })
    .then((itemReviews) => {
      res.send(itemReviews);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
