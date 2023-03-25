const express = require("express");
const router = express.Router();
const Item = require("../../../model/item");

router.delete("/", (req, res) => {
  Item.update(
    {
      deleteFlag: 1,
    },
    {
      where: {
        id: req.query.itemId,
      },
    }
  )
    .then((review) => {
      res.status(200).send({ deleted: review });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
