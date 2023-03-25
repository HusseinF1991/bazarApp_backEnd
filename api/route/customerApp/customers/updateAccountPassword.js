const express = require("express");
const Customer = require("../../../model/customer");
const router = express.Router();

router.post("/", (req, res) => {
  Customer.update(
    {
      password: req.body.newPassword,
    },
    {
      where: {
        id: req.body.customerId,
      },
    }
  )
    .then((updated) => {
      res.send({ updated: updated[0] });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
