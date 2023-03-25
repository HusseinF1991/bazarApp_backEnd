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

router.post("/", upload.single("newLogo"), async (req, res) => {
  let updateInfoJson = {
    brandName: req.body.brandName,
    description: req.body.description,
  };

  if (req.body.oldLogo !== undefined) {
    const fileExt = await path.extname(logoOriginalName);
    updateInfoJson = {
      brandLogo: `${req.body.id}${fileExt}`,
      ...updateInfoJson,
    };
  }
  Brand.update(updateInfoJson, {
    where: {
      id: req.body.id,
    },
  })
    .then(async (num) => {
      if (req.body.oldLogo !== undefined) {
        const fileExt = await path.extname(logoOriginalName);
        fs.unlink(`./multimedia/brandsImages/${req.body.oldLogo}`, (err) => {
          if (err) console.log("error in deleting brand logo img", err);

          fs.rename(
            `./multimedia/brandsImages/${logoOriginalName}`,
            `./multimedia/brandsImages/${req.body.id}${fileExt}`,
            function (err) {
              if (err) console.log("ERROR: " + err);
            }
          );
        });
      }
      res.send({ data: "successfullyAdded" });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

module.exports = router;
