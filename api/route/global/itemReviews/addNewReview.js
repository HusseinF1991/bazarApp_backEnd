const express = require("express");
const resources = require("../../../../config/resource");
const router = express.Router();
const ItemReview = require("../../../model/itemReview");
const ShopNotification = require("../../../model/shopNotification");

router.post("/", (req, res) => {
  ItemReview.create({
    itemId: req.body.itemId,
    reviewerName: req.body.reviewerName,
    title: req.body.title,
    body: req.body.body,
    rate: req.body.rate,
    readByManager: req.body.readByManager,
  })
    .then((result) => {
      res.send(result);

      //its for notification purposes
      if (req.body.readByManager === 0) {
        //if 0 means its sent from a customer, 1 means its sent from the shop manager

        ShopNotification.create({
          shopId: req.body.shopId,
          opTitle: resources.SHOP_NOTIFICATION.NEW_REVIEW.OP_TITLE,
          opDescription: resources.SHOP_NOTIFICATION.NEW_REVIEW.OP_DESCRIPTION,
          opTable: ItemReview.getTableName(),
          opColName: resources.SHOP_NOTIFICATION.NEW_REVIEW.OP_COL_NAME,
          opColContent: req.body.itemId,
        }).catch((err) => {
          console.log(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
