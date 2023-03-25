const express = require("express");
const resources = require("../../../../config/resource");
const Customer = require("../../../model/customer");
const Invoice = require("../../../model/invoice");
const router = express.Router();
const InvoiceChat = require("../../../model/invoiceChat");
const InvoiceShop = require("../../../model/invoiceShop");
const fetch = require("node-fetch");
const ShopNotification = require("../../../model/shopNotification");
const Shop = require("../../../model/shop");

router.post("/", (req, res) => {
  InvoiceChat.create({
    invoiceShopId: req.body.invoiceShopId,
    msgBody: req.body.msgBody,
    sender: req.body.sender,
    isRead: 0,
  })
    .then((invoiceChat) => {
      InvoiceChat.findAll({
        where: { invoiceShopId: req.body.invoiceShopId },
      })
        .then((result) => {
          res.send(result);

          if (req.body.sender === resources.CHAT.CUSTOMER_SENDER) {
            //add notification in shopNotification
            ShopNotification.create({
              shopId: req.body.shopId,
              opTitle: resources.SHOP_NOTIFICATION.NEW_CHAT_MESSAGE.OP_TITLE,
              opDescription:
                resources.SHOP_NOTIFICATION.NEW_CHAT_MESSAGE.OP_DESCRIPTION,
              opTable: InvoiceChat.getTableName(),
              opColName:
                resources.SHOP_NOTIFICATION.NEW_CHAT_MESSAGE.OP_COL_NAME,
              opColContent: req.body.invoiceShopId,
            });
          } else if (req.body.sender === resources.CHAT.MANAGER_SENDER) {
            //send firebase fcm notification to app
            InvoiceShop.findOne({
              where: {
                id: req.body.invoiceShopId,
              },
              include: [
                Shop,
                {
                  model: Invoice,
                  include: [Customer],
                },
              ],
            }).then((invoiceShop) => {
              let notificationBody =
                resources.CUSTOMER_NOTIFICATION.NEW_CHAT_MESSAGE.NOTIFY_BODY1 +
                invoiceShop.invoiceId +
                resources.CUSTOMER_NOTIFICATION.NEW_CHAT_MESSAGE.NOTIFY_BODY2 +
                invoiceShop.Shop.name;
              fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `key=${resources.FIREBASE_SEVER_KEY}`,
                },
                body: JSON.stringify({
                  to: invoiceShop.Invoice.Customer.token,
                  notification: {
                    title: resources.CUSTOMER_NOTIFICATION.NEW_CHAT_MESSAGE.NOTIFY_TITLE,
                    body: notificationBody,
                    mutable_content: true,
                    sound: "Tri-tone",
                  },
                  data: {
                    invoiceId: invoiceShop.invoiceId,
                    shopName: invoiceShop.Shop.name,
                    invoiceShopId: invoiceShop.id,
                    shopId: invoiceShop.Shop.id,
                  },
                }),
              }).catch((err) => {
                console.log("error in sending firebase fcm : ", err);
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.send({ err: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.send({ err: err });
    });
});

module.exports = router;
