const express = require("express");
const router = express.Router();
const Brand = require("../../../model/brand");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

let logoOriginalName = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "multimedia/brandsImages/");
  },
  filename: (req, file, cb) => {
    logoOriginalName = file.originalname;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put("/", upload.single("brandLogo"), (req, res) => {
  Brand.max("id")
    .then(async (maxId) => {
      const fileExt = await path.extname(logoOriginalName);
      Brand.create({
        id: maxId + 1,
        brandName: req.body.brandName,
        brandLogo: `${maxId + 1}${fileExt}`,
        description:
          req.body.description !== "undefined" ? req.body.description : null,
      })
        .then(async (newBrand) => {
          const fileExt = await path.extname(logoOriginalName);
          fs.rename(
            `./multimedia/brandsImages/${logoOriginalName}`,
            `./multimedia/brandsImages/${maxId + 1}${fileExt}`,
            function (err) {
              if (err) console.log("ERROR: " + err);
            }
          );
          res.send({ data: "successfullyAdded" });
        })
        .catch((err) => {
          fs.unlink(`./multimedia/brandsImages/${logoOriginalName}`, (err) => {
            if (err) console.log("error in deleting brandImg , ", err);
          });
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
