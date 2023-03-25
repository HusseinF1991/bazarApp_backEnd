const express = require("express");
const router = express.Router();
const Manager = require("../../../model/manager");

router.post("/", (req, res) => {
  Manager.create({
    username: req.body.username,
    password: req.body.password,
    shopId: req.body.shopId,
  })
    .then((manager) => {
      res.send(manager);
    })
    .catch((err) => {
      console.log(err);
      if (err.parent.code === "ER_DUP_ENTRY") {
        res.send({ err: "usernameDuplicated" });
      }
    });
});

module.exports = router;
