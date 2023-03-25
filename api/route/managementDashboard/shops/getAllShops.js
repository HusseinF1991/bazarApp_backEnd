const express = require("express");
const router = express.Router();
const Shop = require("../../../model/shop");
const fs = require("fs");
const path = require("path");
const Manager = require("../../../model/manager");

router.get("/", (req, res) => {
  Shop.findAll({
      include : Manager,
    // where: {
    //   username: req.body.username,
    //   password: req.body.password,
    // },
  })
    .then((shops) => {
      // await shops.forEach((shop) => {

      //   const fileExt = path.extname(shop.dataValues.logo);
      //   const imageAsBase64 = fs.readFileSync(shop.dataValues.logo, "base64");
      //   shop.dataValues.logo = {image : imageAsBase64 , imageExt : fileExt};
      // });
      res.send(shops);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
