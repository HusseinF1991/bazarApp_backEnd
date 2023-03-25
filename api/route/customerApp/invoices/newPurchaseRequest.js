const express = require("express");
const sequelize = require("../../../../config/connection");
const resources = require("../../../../config/resource");
const Invoice = require("../../../model/invoice");
const InvoiceItem = require("../../../model/invoiceItem");
const InvoiceShop = require("../../../model/invoiceShop");
const router = express.Router();
const Manager = require("../../../model/manager");
const ShopNotification = require("../../../model/shopNotification");

router.post("/", (req, res) => {
  Invoice.create({
    customerId: req.body.customerId,
  })
    .then((newInvoice) => {
      req.body.shopsInvoices.forEach((shopInvoiceElement) => {
        InvoiceShop.create({
          invoiceId: newInvoice.id,
          shopId: shopInvoiceElement.shopId,
          totalCost: shopInvoiceElement.totalCost,
          paidAmount: shopInvoiceElement.paidAmount,
          paymentMethod: shopInvoiceElement.paymentMethod,
          status: resources.INVOICE_STATUS.PENDING,
        })
          .then((newShopInvoice) => {
            //no need to add it to the transaction , its only for notification purposes
            ShopNotification.create({
              shopId: shopInvoiceElement.shopId,
              opTitle: resources.SHOP_NOTIFICATION.NEW_REQUEST.OP_TITLE,
              opDescription: resources.SHOP_NOTIFICATION.NEW_REQUEST.OP_DESCRIPTION,
              opTable: InvoiceShop.getTableName(),
              opColName: resources.SHOP_NOTIFICATION.NEW_REQUEST.OP_COL_NAME,
              opColContent: newShopInvoice.id, 
            }).catch((err) => console.log(err));
            //looping to add item of a specific shop
            shopInvoiceElement.shopInvoiceItems.forEach(
              (invoiceItemsElement) => {
                InvoiceItem.create({
                  invoiceShopId: newShopInvoice.id,
                  typeId: invoiceItemsElement.typeId,
                  purchasePrice: invoiceItemsElement.purchasesPrice,
                  sellPrice: invoiceItemsElement.sellPrice,
                  qty: invoiceItemsElement.qty,
                }).catch((err) => console.log(err));
              }
            );
          })
          .catch((err) => console.log(err));
      });
      res.send({ error: false, invoiceId: newInvoice.id });
    })
    .catch((err) => {
      res.send({ error: true });
    });
});

module.exports = router;
