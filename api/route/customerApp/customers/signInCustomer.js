const express = require("express");
const router = express.Router();
const Manager = require("../../../model/manager");
const con = require("../../../../config/database");
const mysql = require("mysql");
const Shop = require("../../../model/shop");
const jwt = require("jsonwebtoken");
const resources = require("../../../../config/resource");
const Customer = require("../../../model/customer");

router.post("/", (req, res) => {
  Customer.findAll({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  })
    .then((customer) => {
      if (customer.length > 0) {
        Customer.update(
          {
            token: req.body.token,
          },
          {
            where: {
              id: customer.id,
            },
          }
        ).catch((err) => {
          console.log(err);
        });
        res.send(customer[0]);
      } else {
        res.send(resources.ERRORS.USER_NOT_AUTHORIZED);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
