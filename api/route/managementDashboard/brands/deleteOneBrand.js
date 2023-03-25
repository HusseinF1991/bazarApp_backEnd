const express = require("express");
const router = express.Router();
const Brand = require("../../../model/brand");

router.delete("/", (req, res) => {
    Brand.update(
    {
      deleteFlag: 1,
    },
    {
      where: {
        id: req.query.brandId,
      },
    }
  )
    .then((result) => {
      res.status(200).send({ deleted: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
