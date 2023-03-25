const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Invoice = require("../../../model/invoice");
const Customer = require("../../../model/customer");
const InvoiceChat = require("../../../model/invoiceChat");
const InvoiceItem = require("../../../model/invoiceItem");
const InvoiceShop = require("../../../model/invoiceShop");
const ItemType = require("../../../model/itemType");
const Item = require("../../../model/item");
const resources = require("../../../../config/resource");

router.get("/", (req, res) => {
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
          id: req.query.invoiceShopId,
          deleteFlag: 0,
          status: {
            [Op.or]: [resources.INVOICE_STATUS.PENDING, resources.INVOICE_STATUS.APPROVED],
          },
        },
        required: true,
      },
    ],
    // page: req.body.pageNum, // Default 1
    // paginate: 25, // Default 25
    order: [["createdAt", "DESC"]],
    where: {
      deleteFlag: 0,
    },
  };
  Invoice.findAll(options)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
