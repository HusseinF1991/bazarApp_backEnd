const express = require("express");
const Customer = require("../../../model/customer");
const router = express.Router();

router.post("/", (req, res) => {
  Customer.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    token: req.body.token,
    lat: req.body.lat,
    lng: req.body.lng,
    province: req.body.province,
    region: req.body.region,
    mobile: req.body.mobile,
    email: req.body.email,
    appLanguage: req.body.appLanguage,
    isRegistered: 1,
  })
    .then((customer) => {
      res.send(customer);
    })
    .catch((err) => {
      console.log(err);
      if (err.parent.code === "ER_DUP_ENTRY") {
        res.send({ err: "usernameDuplicated" });
      }
    });
});

module.exports = router;
