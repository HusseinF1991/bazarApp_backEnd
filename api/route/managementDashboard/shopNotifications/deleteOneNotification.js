const express = require("express");
const router = express.Router();
const ShopNotification = require("../../../model/shopNotification");

router.delete("/", (req, res) => {
  ShopNotification.destroy({
    where: {
      id: req.query.id,
    },
  })
    .then((result) => {
      res.status(200).send({ deleted: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
