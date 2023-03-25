const express = require("express");
const router = express.Router();
const ItemReview = require("../../../model/itemReview");

router.delete("/", (req, res) => {
  ItemReview.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((review) => {
      res.status(200).send({deleted : review});
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
