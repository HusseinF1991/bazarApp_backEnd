const express = require("express");
const router = express.Router();
const Item = require("../../../model/Item");
const ItemType = require("../../../model/itemType");
const fs = require("fs");
const multer = require("multer");
const mime = require("mime-types");
const ItemTypeImage = require("../../../model/itemTypeImage");

let maxImageId;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "multimedia/itemsGallery/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname + "." + mime.extension(file.mimetype));
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.array("itemImages"), (req, res) => {
  const itemTypesJson = JSON.parse(req.body.itemTypes);

  Item.create({
    itemCode: req.body.itemCode,
    itemName: req.body.itemName,
    shopId: req.body.shopId,
    categoryId: req.body.categoryId,
    brandId: req.body.brandId !== "undefined" ? req.body.brandId : null,
  })
    .then((item) => {
      fs.mkdirSync(`multimedia/itemsGallery/${item.id}`);
      ItemTypeImage.max("id").then((maxId) => {
        maxImageId = maxId !== null ? maxId + 1 : 1;
        itemTypesJson.forEach(async (itemTypeElement, itemTypeIndex) => {
          let itemType = await ItemType.create({
            itemId: item.id,
            typeName: itemTypeElement.typeName,
            availableQty: itemTypeElement.availableQty,
            purchasePrice: itemTypeElement.purchasePrice,
            sellPrice: itemTypeElement.sellPrice,
            discountPrice:
              itemTypeElement.discountPrice !== undefined
                ? itemTypeElement.discountPrice
                : 0,
            description:
              itemTypeElement.description !== undefined
                ? itemTypeElement.description
                : null,
            expDate:
              itemTypeElement.expDate !== undefined
                ? itemTypeElement.expDate
                : null,
          });
          maxImageId = await (maxImageId + itemTypeIndex);
          await itemTypeElement.ItemTypeImages.forEach(
            async (value, typeImagesIndex) => {
              maxImageId = await (maxImageId + typeImagesIndex);
              let img = await ItemTypeImage.create({
                id: maxImageId,
                itemId: item.id,
                typeId: itemType.id,
                imageLoc: `${item.id}/${maxImageId}.${mime.extension(
                  value.mimeType
                )}`,
              });
              await fs.rename(
                `./multimedia/itemsGallery/${itemTypeElement.typeName}${
                  value.key
                }.${mime.extension(value.mimeType)}`,
                `./multimedia/itemsGallery/${img.imageLoc}`,
                function (err) {
                  if (err) {
                    console.log("ERROR: " + err);
                    res.send({ err: "err" });
                  }
                }
              );
            }
          );
        });
      });
      res.send(req.body);
      // res.send(category);
    })
    .catch((err) => {
      console.log(err);
      res.send({ err: "err" });
    });
});

module.exports = router;
