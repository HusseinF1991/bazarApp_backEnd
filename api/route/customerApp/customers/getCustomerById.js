const express = require("express");
const router = express.Router();
const Customer = require("../../../model/customer");

router.get("/", (req, res) => {
  Customer.findOne({
    where: {
      id: req.query.id,
    },
  })
    .then((customer) => {
      res.send(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
