const express = require("express");
const router = express.Router();
const Shop = require("../../../model/shop");
const Manager = require("../../../model/manager");

router.post("/", (req, res) => {
    console.log(req.body);
  Shop.findAll({
    include: Manager,
    where: {
      id: req.body.shopId,
    },
  })
    .then(async (shops) => {
      res.send(shops);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
