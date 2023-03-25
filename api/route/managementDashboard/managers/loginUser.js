const express = require("express");
const router = express.Router();
const Manager = require("../../../model/manager");
const con = require("../../../../config/database");
const mysql = require("mysql");
const Shop = require("../../../model/shop");
const jwt = require("jsonwebtoken");
const resources = require("../../../../config/resource");

router.post("/", (req, res) => {
  Manager.findAll({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
    include: [Shop],
  })
    .then((manager) => {
      if (manager.length > 0) {
        const data = {
          username: manager[0].username,
          password: manager[0].password,
        };
        jwt.sign(
          { data },
          resources.JWT.SECRET,
          { expiresIn: "12h" },
          function (err, token) {
            if (err) console.log(err);
            
            res.send({ manager : manager, token : token });
          }
        );
      } else {
        res.send(resources.ERRORS.USER_NOT_AUTHORIZED);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
