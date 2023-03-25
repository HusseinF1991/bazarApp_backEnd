const express = require("express");
const router = express.Router();
const ItemType = require("../../../model/itemType");

router.delete("/", (req, res) => {
  ItemType.update(
    {
      deleteFlag: 1,
    },
    {
      where: {
        id: req.query.typeId,
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
