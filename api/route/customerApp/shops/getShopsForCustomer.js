const express = require("express");
const router = express.Router();
const Shop = require("../../../model/shop");
const fs = require("fs");
const path = require("path");
const Manager = require("../../../model/manager");

router.get("/", (req, res) => {
  Shop.findAll()
    .then((shops) => {
      res.send(shops);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
