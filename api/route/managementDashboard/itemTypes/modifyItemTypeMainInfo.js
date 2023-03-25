const express = require("express");
const router = express.Router();
const ItemType = require("../../../model/itemType");

router.post("/", (req, res) => {
  ItemType.update({
    
    typeName : req.body.typeName,
    availableQty : req.body.availableQty,
    purchasePrice : req.body.purchasePrice,
    sellPrice : req.body.sellPrice,
    discountPrice : req.body.discountPrice,
    },
      {
      where: {
          id: req.body.id
      }
  })
    .then((result) => {
      res.send({modified : result[0]});
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
