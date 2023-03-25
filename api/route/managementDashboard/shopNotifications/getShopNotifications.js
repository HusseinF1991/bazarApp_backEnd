const express = require("express");
const router = express.Router();
const ShopNotification = require("../../../model/shopNotification");

router.get("/", (req, res) => {
  ShopNotification.findAll({
    where: {
      shopId: req.query.shopId,
    //   password: req.body.password,
    },
  })
    .then((shopNotifications) => {
      res.send(shopNotifications);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
