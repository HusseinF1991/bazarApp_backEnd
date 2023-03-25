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
  const itemMainDetailsJson = JSON.parse(req.body.itemMainDetails);
  let itemMainDetailsToUpdate = {
    itemCode: itemMainDetailsJson.itemCode,
    itemName: itemMainDetailsJson.itemName,
  };
  if (typeof itemMainDetailsJson.categoryId !== "string") {
    itemMainDetailsToUpdate = {
      categoryId: itemMainDetailsJson.categoryId,
      ...itemMainDetailsToUpdate,
    };
  }
  if (typeof itemMainDetailsJson.brandId !== "string") {
    itemMainDetailsToUpdate = {
      brandId: itemMainDetailsJson.brandId,
      ...itemMainDetailsToUpdate,
    };
  } else if (
    typeof itemMainDetailsJson.brandId === "string" &&
    itemMainDetailsJson.brandId === ""
  ) {
    itemMainDetailsToUpdate = {
      brandId: null,
      ...itemMainDetailsToUpdate,
    };
  }

  Item.update(itemMainDetailsToUpdate, {
    where: {
      id: itemMainDetailsJson.itemId,
    },
  })
    .then((number) => {
      ItemTypeImage.max("id").then((maxId) => {
        maxImageId = maxId + 1;
        itemTypesJson.forEach(async (itemTypeElement, itemTypeIndex) => {
          if (itemTypeElement.id === undefined) {
            ItemType.create({
              itemId: itemMainDetailsJson.itemId,
              typeName: itemTypeElement.typeName,
              availableQty: itemTypeElement.availableQty,
              purchasePrice: itemTypeElement.purchasePrice,
              sellPrice: itemTypeElement.sellPrice,
              discountPrice:
                itemTypeElement.discountPrice !== undefined &&
                itemTypeElement.discountPrice !== null
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
            })
              .then(async (newType) => {
                maxImageId = await (maxImageId + itemTypeIndex);
                await itemTypeElement.ItemTypeImages.forEach(
                  async (value, typeImagesIndex) => {
                    if (value.data !== "") {
                      maxImageId = await (maxImageId + typeImagesIndex);
                      await ItemTypeImage.create({
                        id: maxImageId,
                        itemId: itemMainDetailsJson.itemId,
                        typeId: newType.id,
                        imageLoc: `${
                          itemMainDetailsJson.itemId
                        }/${maxImageId}.${mime.extension(value.mimeType)}`,
                      }).then((img) => {
                        fs.rename(
                          `./multimedia/itemsGallery/${
                            itemTypeElement.typeName
                          }${value.key}.${mime.extension(value.mimeType)}`,
                          `./multimedia/itemsGallery/${img.imageLoc}`,
                          function (err) {
                            if (err) {
                              console.log("ERROR in renaming img: " + err);
                              // res.send({ err: "err" });
                            }
                          }
                        );
                      });
                    } else if (value.deleted === true) {
                      maxImageId = maxImageId - 1;
                      ItemTypeImage.destroy({
                        where: {
                          id: value.id,
                        },
                      }).then((number) => {
                        fs.unlink(
                          `./multimedia/itemsGallery/${value.imageLoc}`,
                          function (err) {
                            if (err) {
                              console.log("ERROR in deleting img: " + err);
                              // res.send({ err: "err" });
                            }
                          }
                        );
                      });
                    } else {
                      maxImageId = maxImageId - 1;
                    }
                  }
                );
              })
              .catch((err) => {
                console.log("err of creating itemType : ", err);
              });
          } else if (
            itemTypeElement.id !== undefined &&
            itemTypeElement.deleted === undefined
          ) {
            ItemType.update(
              {
                itemId: itemMainDetailsJson.itemId,
                typeName: itemTypeElement.typeName,
                availableQty: itemTypeElement.availableQty,
                purchasePrice: itemTypeElement.purchasePrice,
                sellPrice: itemTypeElement.sellPrice,
                discountPrice:
                  itemTypeElement.discountPrice !== undefined &&
                  itemTypeElement.discountPrice !== null
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
              },
              {
                where: {
                  id: itemTypeElement.id,
                },
              }
            )
              .then(async (number) => {
                maxImageId = await (maxImageId + itemTypeIndex);
                await itemTypeElement.ItemTypeImages.forEach(
                  async (value, typeImagesIndex) => {
                    if (value.data !== "") {
                      maxImageId = await (maxImageId + typeImagesIndex);
                      await ItemTypeImage.create({
                        id: maxImageId,
                        itemId: itemMainDetailsJson.itemId,
                        typeId: itemTypeElement.id,
                        imageLoc: `${
                          itemMainDetailsJson.itemId
                        }/${maxImageId}.${mime.extension(value.mimeType)}`,
                      }).then((img) => {
                        fs.rename(
                          `./multimedia/itemsGallery/${
                            itemTypeElement.typeName
                          }${value.key}.${mime.extension(value.mimeType)}`,
                          `./multimedia/itemsGallery/${img.imageLoc}`,
                          function (err) {
                            if (err) {
                              console.log("ERROR in renaming img: " + err);
                              // res.send({ err: "err" });
                            }
                          }
                        );
                      });
                    } else if (value.deleted === true) {
                      maxImageId = maxImageId - 1;
                      await ItemTypeImage.destroy({
                        where: {
                          id: value.id,
                        },
                      }).then((number) => {
                        fs.unlink(
                          `./multimedia/itemsGallery/${value.imageLoc}`,
                          function (err) {
                            if (err) {
                              console.log("ERROR in deleting img: " + err);
                              // res.send({ err: "err" });
                            }
                          }
                        );
                      });
                    } else {
                      maxImageId = maxImageId - 1;
                    }
                  }
                );
              })
              .catch((err) => {
                console.log("err of updating itemType : ", err);
              });
          } else if (itemTypeElement.deleted === true) {
            ItemType.update(
              {
                deleteFlag: 1,
              },
              {
                where: {
                  id: itemTypeElement.id,
                },
              }
            );
          }
        });
      });
      res.send(req.body);
      // res.send(category);
    })
    .catch((err) => {
      console.log("err of updating item : ", err);
      res.send({ err: "err" });
    });
});

module.exports = router;
