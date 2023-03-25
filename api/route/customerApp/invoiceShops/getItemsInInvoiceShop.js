const express = require("express");
const router = express.Router();
const InvoiceItem = require("../../../model/invoiceItem");
const InvoiceShop = require("../../../model/invoiceShop");
const ItemType = require("../../../model/itemType");
const Item = require("../../../model/item");
const ItemTypeImage = require("../../../model/itemTypeImage");

router.get("/", (req, res) => {
  // Or with extra options
  const options = {
    // subQuery: false,
    include: [
      //   { model: Customer, attributes: { exclude: ["password"] } },
      {
        model: InvoiceItem,
        include: [
          { model: ItemType, include: [Item, ItemTypeImage] },
          //   InvoiceChat,
        ],
        // where: {
        //   deleteFlag: 0,
        //   status: {
        //     [Op.or]: [
        //       resources.INVOICE_STATUS.PENDING,
        //       resources.INVOICE_STATUS.APPROVED,
        //     ],
        //   },
        // },
        required: true,
      },
    ],
    // page: req.body.pageNum, // Default 1
    // paginate: 25, // Default 25
    order: [["createdAt", "DESC"]],
    where: {
      deleteFlag: 0,
      id: req.query.invoiceShopId,
    },
  };
  InvoiceShop.findAll(options)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
