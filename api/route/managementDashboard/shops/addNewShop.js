const express = require("express");
const router = express.Router();
const Shop = require("../../../model/shop");
const Manager = require("../../../model/manager");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

let logoOriginalName = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "multimedia/shopsImages/");
  },
  filename: (req, file, cb) => {
    logoOriginalName = file.originalname;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("logo"), (req, res) => {
  Shop.max("id")
    .then(async (maxId) => {
      const fileExt = await path.extname(logoOriginalName);
      Shop.create({
        id: maxId + 1,
        name: req.body.name,
        logo: `${maxId + 1}${fileExt}`,
        specialty: req.body.specialty,
        location: req.body.location,
        email: req.body.email,
        mobile: req.body.mobile,
        profitRate: req.body.profitRate,
      })
        .then((newShop) => {
          Manager.create({
            username: req.body.username,
            password: req.body.password,
            shopId: maxId + 1,
          })
            .then(async (newManager) => {
              const fileExt = await path.extname(logoOriginalName);
              fs.rename(
                `./multimedia/shopsImages/${logoOriginalName}`,
                `./multimedia/shopsImages/${maxId + 1}${fileExt}`,
                function (err) {
                  if (err) console.log("ERROR: " + err);
                }
              );
              res.send({ data: "successfullyAdded" });
            })
            .catch((err) => {
              if (err.parent.code === "ER_DUP_ENTRY") {
                Shop.destroy({
                  where: {
                    id: maxId + 1,
                  },
                });
                res.send({ err: "usernameDuplicated" });
              } else {
                console.log(err);
                res.send(err);
              }
            });
        })
        .catch((err) => {
          if (err.parent.code === "ER_DUP_ENTRY") {
            res.send({ err: "shopNameDuplicated" });
          } else {
            console.log(err);
            res.send(err);
          }
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
