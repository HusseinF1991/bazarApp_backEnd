const express = require("express");
const Customer = require("../../../model/customer");
const router = express.Router();

router.post("/", (req, res) => {
  Customer.update({
    name: req.body.name,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    // token: req.body.token,
    // lat: req.body.lat,
    // lng: req.body.lng,
    province: req.body.province,
    region: req.body.region,
    mobile: req.body.mobile,
    email: req.body.email,
    appLanguage: req.body.appLanguage,
  } , {
    where : {
      id: req.body.customerId
    }
  })
    .then((updated) => {
      res.send({ updated: updated[0] });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
