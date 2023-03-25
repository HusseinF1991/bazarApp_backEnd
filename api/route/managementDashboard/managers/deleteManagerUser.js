const express = require("express");
const router = express.Router();
const Manager = require("../../../model/manager");

router.delete("/", (req, res) => {
  Manager.destroy({
    where: {
      username: req.body.username,
    },
  })
    .then((manager) => {
      res.status(200).send({deleted : manager});
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
