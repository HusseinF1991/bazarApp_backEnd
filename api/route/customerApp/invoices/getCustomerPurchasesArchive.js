const express = require("express");
const router = express.Router();
const { Op, Sequelize } = require("sequelize");
const Invoice = require("../../../model/invoice");
const InvoiceChat = require("../../../model/invoiceChat");
const InvoiceItem = require("../../../model/invoiceItem");
const InvoiceShop = require("../../../model/invoiceShop");
const resources = require("../../../../config/resource");
const Shop = require("../../../model/shop");

router.get("/", (req, res) => {
  // Or with extra options
  const options = {
    // subQuery: false,
    include: [
      //   { model: Customer, attributes: { exclude: ["password"] } },
      {
        model: InvoiceShop,
        include: [
          {
            model: Shop,
            required: true,
          },
          {
            model: InvoiceItem,
            required: true,
            separate: true,
            // where: { readByManager: 0 },
            attributes: [
              [Sequelize.fn("SUM", Sequelize.col("qty")), "itemsCount"],
            ],
            group: "invoiceShopId",
          },
        ],
        where: {
          deleteFlag: 0,
          status: {
            [Op.or]: [
              resources.INVOICE_STATUS.DELIVERED,
              resources.INVOICE_STATUS.REJECTED,
            ],
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
      customerId: req.query.customerId,
    },
  };
  Invoice.findAll(options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
