const express = require("express");
const router = express.Router();
const InvoiceShop = require("../../../model/invoiceShop");
const InvoiceItem = require("../../../model/invoiceItem");
const ItemType = require("../../../model/itemType");
const { Sequelize, Op } = require("sequelize");
const resources = require("../../../../config/resource");
const fetch = require("node-fetch");
const Shop = require("../../../model/shop");
const Invoice = require("../../../model/invoice");
const Customer = require("../../../model/customer");

router.post("/", (req, res) => {
  InvoiceShop.update(
    {
      totalCost: req.body.totalCost,
      paidAmount: req.body.paidAmount,
      status: req.body.newStatus,
    },
    {
      where: {
        id: req.body.invoiceShopId,
      },
    }
  )
    .then((number) => {
      if (req.body.deleteItemsId.length > 0) {
        InvoiceItem.destroy({
          where: {
            id: { [Op.in]: req.body.deleteItemsId },
          },
        })
          .then((num) => {
            res.send({ updated: number, deleted: num });
          })
          .catch((err) => {
            console.log("err in deleting items in InvoiceItem : ", err);
            res.send({ err: "err" });
          });
      } else {
        res.send({ updated: number });
      }

      if (
        req.body.oldStatus === resources.INVOICE_STATUS.PENDING &&
        (req.body.newStatus === resources.INVOICE_STATUS.DELIVERED ||
          req.body.newStatus === resources.INVOICE_STATUS.APPROVED)
      ) {
        //subtract purchased items quantities from itemtype tbl
        req.body.invoiceItemsWithDeleted.forEach((element) => {
          //dont subtract the quantities of the removed items from the invoice
          if (
            req.body.deleteItemsId.filter((id) => id === element.id).length ===
            0
          ) {
            ItemType.update(
              {
                availableQty: Sequelize.literal(
                  `availableQty - ${element.qty}`
                ),
              },
              {
                where: {
                  id: element.ItemType.id,
                },
              }
            )
              .then((updateNum) => {
                // res.send({ updated: "successful" });
              })
              .catch((err) => {
                console.log("err in updating itemType qty : ", err);
              });
          }
        });
      } else if (
        req.body.oldStatus === resources.INVOICE_STATUS.APPROVED &&
        (req.body.newStatus === resources.INVOICE_STATUS.PENDING ||
          req.body.newStatus === resources.INVOICE_STATUS.REJECTED)
      ) {
        //add-back requested items quantities to the itemtype tbl
        req.body.invoiceItemsWithDeleted.forEach((element) => {
          ItemType.update(
            {
              availableQty: Sequelize.literal(`availableQty + ${element.qty}`),
            },
            {
              where: {
                id: element.ItemType.id,
              },
            }
          )
            .then((updateNum) => {
              // res.send({ updated: "successful" });
            })
            .catch((err) => {
              console.log("err in updating itemType qty : ", err);
            });
        });
      } else if (
        req.body.oldStatus === resources.INVOICE_STATUS.APPROVED &&
        (req.body.newStatus === resources.INVOICE_STATUS.APPROVED ||
          req.body.newStatus === resources.INVOICE_STATUS.DELIVERED)
      ) {
        //add-back requested items quantities to the itemtype tbl
        req.body.invoiceItemsWithDeleted.forEach((element) => {
          //add-back the quantities of the removed items only from the invoice
          if (
            req.body.deleteItemsId.filter((id) => id === element.id).length > 0
          ) {
            ItemType.update(
              {
                availableQty: Sequelize.literal(
                  `availableQty + ${element.qty}`
                ),
              },
              {
                where: {
                  id: element.ItemType.id,
                },
              }
            )
              .then((updateNum) => {
                // res.send({ updated: "successful" });
              })
              .catch((err) => {
                console.log("err in updating itemType qty : ", err);
              });
          }
        });
      }

      //for fcm notification
      InvoiceShop.findOne({
        include: [
          Shop,
          {
            model: Invoice,
            include: [Customer],
          },
        ],
        where: {
          id: req.body.invoiceShopId,
        },
      })
        .then((OneInvoiceShop) => {
          if (req.body.newStatus === resources.INVOICE_STATUS.DELIVERED) {
            let notificationBody =
              resources.CUSTOMER_NOTIFICATION.INVOICE_DELIVERED.NOTIFY_BODY1 +
              OneInvoiceShop.invoiceId +
              resources.CUSTOMER_NOTIFICATION.INVOICE_DELIVERED.NOTIFY_BODY2 +
              OneInvoiceShop.Shop.name +
              resources.CUSTOMER_NOTIFICATION.INVOICE_DELIVERED.NOTIFY_BODY3;
            fetch("https://fcm.googleapis.com/fcm/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `key=${resources.FIREBASE_SEVER_KEY}`,
              },
              body: JSON.stringify({
                to: OneInvoiceShop.Invoice.Customer.token,
                notification: {
                  title: resources.CUSTOMER_NOTIFICATION.INVOICE_DELIVERED.NOTIFY_TITLE,
                  body: notificationBody,
                  mutable_content: true,
                  sound: "Tri-tone",
                },
                data: {
                  invoiceId: OneInvoiceShop.invoiceId,
                  shopName: OneInvoiceShop.Shop.name,
                },
              }),
            }).catch((err) => {
              console.log("error in sending firebase fcm : ", err);
            });
          } else if (req.body.newStatus === resources.INVOICE_STATUS.REJECTED) {
            let notificationBody =
              resources.CUSTOMER_NOTIFICATION.INVOICE_REJECTED.NOTIFY_BODY1 +
              OneInvoiceShop.invoiceId +
              resources.CUSTOMER_NOTIFICATION.INVOICE_REJECTED.NOTIFY_BODY2 +
              OneInvoiceShop.Shop.name +
              resources.CUSTOMER_NOTIFICATION.INVOICE_REJECTED.NOTIFY_BODY3;

            fetch("https://fcm.googleapis.com/fcm/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `key=${resources.FIREBASE_SEVER_KEY}`,
              },
              body: JSON.stringify({
                to: OneInvoiceShop.Invoice.Customer.token,
                notification: {
                  title: resources.CUSTOMER_NOTIFICATION.INVOICE_REJECTED.NOTIFY_TITLE,
                  body: notificationBody,
                  mutable_content: true,
                  sound: "Tri-tone",
                },
                data: {
                  invoiceId: OneInvoiceShop.invoiceId,
                  shopName: OneInvoiceShop.Shop.name,
                },
              }),
            }).catch((err) => {
              console.log("error in sending firebase fcm : ", err);
            });
          } else {
            let notificationBody =
              resources.CUSTOMER_NOTIFICATION.INVOICE_MODIFIED.NOTIFY_BODY1 +
              OneInvoiceShop.invoiceId +
              resources.CUSTOMER_NOTIFICATION.INVOICE_MODIFIED.NOTIFY_BODY2 +
              OneInvoiceShop.Shop.name +
              resources.CUSTOMER_NOTIFICATION.INVOICE_MODIFIED.NOTIFY_BODY3;

            fetch("https://fcm.googleapis.com/fcm/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `key=${resources.FIREBASE_SEVER_KEY}`,
              },
              body: JSON.stringify({
                to: OneInvoiceShop.Invoice.Customer.token,
                notification: {
                  title: resources.CUSTOMER_NOTIFICATION.INVOICE_MODIFIED.NOTIFY_TITLE,
                  body: notificationBody,
                  mutable_content: true,
                  sound: "Tri-tone",
                },
                data: {
                  invoiceId: OneInvoiceShop.invoiceId,
                  shopName: OneInvoiceShop.Shop.name,
                },
              }),
            }).catch((err) => {
              console.log("error in sending firebase fcm : ", err);
            });
          }
        })
        .catch((err) => {
          console.log(
            "error in getting invoiceShop for notification purpose :",
            err
          );
        });
    })
    .catch((err) => {
      console.log("err in updating InvoiceShop : ", err);
      // res.send({ err: "err" });
    });
});

module.exports = router;
