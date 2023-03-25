const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const Invoice = require("../../../model/invoice");
const Customer = require("../../../model/customer");
const InvoiceChat = require("../../../model/invoiceChat");
const InvoiceItem = require("../../../model/invoiceItem");
const InvoiceShop = require("../../../model/invoiceShop");
const ItemType = require("../../../model/itemType");
const Item = require("../../../model/item");
const resources = require("../../../../config/resource");

router.post("/", (req, res) => {
  // Or with extra options
  const options = {
    // subQuery: false,
    include: [
      { model: Customer, attributes: { exclude: ["password"] } },
      {
        model: InvoiceShop,
        include: [
          InvoiceChat,
          {
            model: InvoiceItem,
            include: [{ model: ItemType, include: [Item] }],
          },
        ],
        where: {
          shopId: req.body.shopId,
          deleteFlag: 0,
          status: {
            [Op.or]: [resources.INVOICE_STATUS.DELIVERED, resources.INVOICE_STATUS.REJECTED],
          },
        },
        required: true,
      },
    ],
    page: req.body.pageNum, // Default 1
    paginate: 25, // Default 25
    order: [["createdAt", "DESC"]],
    where: {
      deleteFlag: 0,
    },
  };
  Invoice.paginate(options)
    .then(({ docs, pages, total }) => {
      res.send({ docs: docs, pages: pages, total: total });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
