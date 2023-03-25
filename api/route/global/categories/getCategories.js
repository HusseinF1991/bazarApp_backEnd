const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Category = require("../../../model/category");

router.get("/", (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
