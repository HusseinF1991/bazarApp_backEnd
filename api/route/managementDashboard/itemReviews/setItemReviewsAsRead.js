const express = require("express");
const router = express.Router();
const ItemReview = require("../../../model/itemReview");

router.put("/", (req, res) => {
  ItemReview.update({
    readByManager : 1,
  },
  {
    where: {
      itemId: req.query.itemId,
    },
  })
    .then((reviews) => {
      res.status(200).send({updated : reviews});
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
