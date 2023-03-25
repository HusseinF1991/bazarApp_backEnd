const express = require("express");
const router = express.Router();
const Manager = require("../../../model/Manager");

router.post("/", async (req, res) => {
  Manager.update(
    {
      token: req.body.token,
    },
    {
      where: {
        username: req.body.username,
        password: req.body.password
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
