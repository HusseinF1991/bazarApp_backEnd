const express = require("express");
const router = express.Router();
const Customer = require("../../../model/customer");

router.post("/", async (req, res) => {
  Customer.update(
    {
        token: req.body.token
    },
    {
      where: {
        id: req.body.customerId,
      },
    }
  )
    .then((updated) => {
      res.send({ updated: updated });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

module.exports = router;
