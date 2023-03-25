const express = require("express");
const router = express.Router();
const Shop = require("../../../model/shop");
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

router.post("/", upload.single("newLogo"),async (req, res) => {
  let updateInfoJson = {
    name: req.body.name,
    specialty: req.body.specialty,
    location: req.body.location,
    email: req.body.email,
    mobile: req.body.mobile,
    profitRate: req.body.profitRate,
  };

  if (req.body.oldLogo !== undefined) {
    const fileExt = await path.extname(logoOriginalName);
    updateInfoJson = {
      logo: `${req.body.id}${fileExt}`,
      ...updateInfoJson,
    };
  }
  Shop.update(updateInfoJson, {
    where: {
      id: req.body.id,
    },
  })
    .then(async (num) => {
      if (req.body.oldLogo !== undefined) {
        const fileExt = await path.extname(logoOriginalName);
        fs.unlink(`./multimedia/shopsImages/${req.body.oldLogo}`, (err) => {
          if (err) console.log("error in deleting logo img", err);

          fs.rename(
            `./multimedia/shopsImages/${logoOriginalName}`,
            `./multimedia/shopsImages/${req.body.id}${fileExt}`,
            function (err) {
              if (err) console.log("ERROR: " + err);
            }
          );
        });
      }
      res.send({ data: "successfullyAdded" });
    })
    .catch((err) => {
      if (err.parent.code === "ER_DUP_ENTRY") {
        if (req.body.oldLogo !== undefined) {
          fs.unlink(`./multimedia/shopsImages/${logoOriginalName}`, (err) => {
            if (err) console.log("error in deleting logo img", err);
          });
        }
        res.send({ err: "shopNameDuplicated" });
      } else {
        console.log(err);
        res.send(err);
      }
    });
});

module.exports = router;
