const express = require("express");
const resources = require("../../../../config/resource");
const verifyToken = require("../../../middleware/userAuthorization");
const router = express.Router();
const Manager = require("../../../model/manager");
const Shop = require("../../../model/shop");

router.get("/", verifyToken, (req, res) => {
  Manager.findAll({
    where: {
      username: req.userCredentials.username,
      password: req.userCredentials.password,
    },
    include: [Shop],
  })
    .then((manager) => {
      if (manager.length > 0) {
        res.send(manager);
      } else {
        res.send(resources.ERRORS.USER_NOT_AUTHORIZED);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
