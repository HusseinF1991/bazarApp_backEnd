const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Brand = require("../../../model/brand");

router.get("/", (req, res) => {
    Brand.findAll({
      where:{
        deleteFlag : 0
      }
    })
    .then((brands) => {
      res.send(brands);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
