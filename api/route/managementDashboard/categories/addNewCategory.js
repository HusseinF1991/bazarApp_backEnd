const express = require("express");
const router = express.Router();
const Category = require("../../../model/category");

router.post("/", (req, res) => {
  Category.create({
    catLevel: req.body.catLevel,
    catName: req.body.catName,
    parentCatId: req.body.parentCatId,
  })
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
