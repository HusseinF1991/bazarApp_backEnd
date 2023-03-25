const express = require("express");
const router = express.Router();
const InvoiceChat = require("../../../model/invoiceChat");

router.get("/", (req, res) => {
    InvoiceChat.findAll({
    order: [["createdAt", "ASC"]],
    where: {
      invoiceShopId: req.query.id,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
