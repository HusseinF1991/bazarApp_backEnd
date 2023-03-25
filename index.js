require("dotenv").config();
require("./api/model/item");
require("./api/model/itemType");
require("./api/model/itemTypeImage");
require("./api/model/itemReview");
require("./api/model/category");
require("./api/model/customer");
require("./api/model/invoice");
require("./api/model/invoiceItem");
require("./api/model/shop");
require("./api/model/invoiceChat");
require("./api/model/shopNotification");
const Manager = require("./api/model/manager");

Manager.findAll()
  .then((managers) => {
    if (managers.length === 0) {
      Manager.create({
        username: "admin",
        password: "admin",
        // shopId: 0,
      }).catch((err) => {
        console.log(err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
var cors = require("cors");
const { createServer } = require("http");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const httpServer = createServer(app);

//
//
/* start of MANAGING-DASHBOARD api */
//
//

//manager model
app.use(
  "/loginMerchant",
  require("./api/route/managementDashboard/managers/loginUser")
);
app.use(
  "/addNewManager",
  require("./api/route/managementDashboard/managers/addNewManager")
);
app.use(
  "/deleteManagerUser",
  require("./api/route/managementDashboard/managers/deleteManagerUser")
);
app.use(
  "/getUserDetails",
  require("./api/route/managementDashboard/managers/getUserDetails")
);
app.use(
  "/setManagerToken",
  require("./api/route/managementDashboard/managers/setManagerToken")
);

//shop model
app.use(
  "/getAllShops",
  require("./api/route/managementDashboard/shops/getAllShops")
);
app.use(
  "/addNewShop",
  require("./api/route/managementDashboard/shops/addNewShop")
);
app.use(
  "/getOneShopDetails",
  require("./api/route/managementDashboard/shops/getOneShopDetails")
);
app.use(
  "/editShopInfo",
  require("./api/route/managementDashboard/shops/editShopInfo")
);

//Category model
app.use(
  "/addNewCategory",
  require("./api/route/managementDashboard/categories/addNewCategory")
);
app.use(
  "/deleteCategory",
  require("./api/route/managementDashboard/categories/deleteCategory")
);

//Item model
app.use(
  "/getOneItemDetails",
  require("./api/route/managementDashboard/items/getOneItemDetails")
);
app.use("/getItems", require("./api/route/managementDashboard/items/getItems"));
app.use(
  "/addNewItem",
  require("./api/route/managementDashboard/items/addNewItem")
);
app.use(
  "/modifyItem",
  require("./api/route/managementDashboard/items/modifyItem")
);
app.use(
  "/deleteOneItem",
  require("./api/route/managementDashboard/items/deleteOneItem")
);

//Brand model
app.use(
  "/deleteOneBrand",
  require("./api/route/managementDashboard/brands/deleteOneBrand")
);
app.use(
  "/addNewBrand",
  require("./api/route/managementDashboard/brands/addNewBrand")
);
app.use(
  "/editBrand",
  require("./api/route/managementDashboard/brands/editBrand")
);

//ItemType model
app.use(
  "/modifyItemTypeMainInfo",
  require("./api/route/managementDashboard/itemTypes/modifyItemTypeMainInfo")
);
app.use(
  "/deleteOneItemType",
  require("./api/route/managementDashboard/itemTypes/deleteOneItemType")
);

//ItemReview model
app.use(
  "/deleteOneReview",
  require("./api/route/managementDashboard/itemReviews/deleteOneReview")
);
app.use(
  "/addNewReview",
  require("./api/route/global/itemReviews/addNewReview")
);
app.use(
  "/setItemReviewsAsRead",
  require("./api/route/managementDashboard/itemReviews/setItemReviewsAsRead")
);

//Invoice model
app.use(
  "/getPurchasesRequests",
  require("./api/route/managementDashboard/invoices/getPurchasesRequests")
);
app.use(
  "/getOnePurchaseReq",
  require("./api/route/managementDashboard/invoices/getOnePurchaseReq")
);
app.use(
  "/getSellsArchive",
  require("./api/route/managementDashboard/invoices/getSellsArchive")
);

//InvoiceShop model
app.use(
  "/updateInInvoiceShops",
  require("./api/route/managementDashboard/invoiceShops/updateInInvoiceShops")
);

//ShopNotifications model
app.use(
  "/getShopNotifications",
  require("./api/route/managementDashboard/shopNotifications/getShopNotifications")
);
app.use(
  "/deleteOneNotification",
  require("./api/route/managementDashboard/shopNotifications/deleteOneNotification")
);

//
//
/* end of MANAGING-DASHBOARD api */
//
//

//
//
/* start of CUSTOMER-APP api*/
//
//

//InvoiceShop model
app.use(
  "/getItemsInInvoiceShop",
  require("./api/route/customerApp/invoiceShops/getItemsInInvoiceShop")
);

//Invoice model
app.use(
  "/getCustomerPurchasesReqs",
  require("./api/route/customerApp/invoices/getCustomerPurchasesReqs")
);
app.use(
  "/getCustomerPurchasesArchive",
  require("./api/route/customerApp/invoices/getCustomerPurchasesArchive")
);
app.use(
  "/newPurchaseRequest",
  require("./api/route/customerApp/invoices/newPurchaseRequest")
);

//Item model
app.use(
  "/getBestSellingItems",
  require("./api/route/customerApp/items/getBestSellingItems")
);
app.use(
  "/getTrendingItems",
  require("./api/route/customerApp/items/getTrendingItems")
);
app.use(
  "/getNewlyAddedItems",
  require("./api/route/customerApp/items/getNewlyAddedItems")
);
app.use(
  "/getItemsInDiscount",
  require("./api/route/customerApp/items/getItemsInDiscount")
);
app.use(
  "/getOneItemDetailsForCustomer",
  require("./api/route/customerApp/items/getOneItemDetailsForCustomer")
);
app.use(
  "/getItemsByCategory",
  require("./api/route/customerApp/items/getItemsByCategory")
);
app.use(
  "/getItemsBySearchKeyword",
  require("./api/route/customerApp/items/getItemsBySearchKeyword")
);
app.use(
  "/getItemsDetailsInCart",
  require("./api/route/customerApp/items/getItemsDetailsInCart")
);

//shop model
app.use(
  "/getShopsForCustomer",
  require("./api/route/customerApp/shops/getShopsForCustomer")
);

//Customer model
app.use(
  "/registerNewCustomer",
  require("./api/route/customerApp/customers/registerNewCustomer")
);
app.use(
  "/getCustomerById",
  require("./api/route/customerApp/customers/getCustomerById")
);
app.use(
  "/signInCustomer",
  require("./api/route/customerApp/customers/signInCustomer")
);
app.use(
  "/updateCustomerToken",
  require("./api/route/customerApp/customers/updateCustomerToken")
);
app.use(
  "/updateAccountPassword",
  require("./api/route/customerApp/customers/updateAccountPassword")
);
app.use(
  "/updateAccountInfo",
  require("./api/route/customerApp/customers/updateAccountInfo")
);

//ItemReview model
app.use(
  "/getItemReviews",
  require("./api/route/customerApp/itemReviews/getItemReviews")
);

//
//
/* end of CUSTOMER-APP api*/
//
//

//
//
/*start of global api */
//
//

//InvoiceChat model
app.use(
  "/getInvoiceShopChat",
  require("./api/route/global/invoiceChats/getInvoiceShopChat")
);
app.use(
  "/addNewMsgToChat",
  require("./api/route/global/invoiceChats/addNewMsgToChat")
);

//ItemReview model
app.use(
  "/addNewReview",
  require("./api/route/global/itemReviews/addNewReview")
);

//Brand model
app.use("/getBrands", require("./api/route/global/brands/getBrands"));

//Category model
app.use(
  "/getCategories",
  require("./api/route/global/categories/getCategories")
);

//for getting items images
app.use("/api/getItemImage/", express.static("multimedia/itemsGallery"));

//for getting shops images
app.use("/api/getShopImage/", express.static("multimedia/shopsImages"));

//for getting brands images
app.use("/api/getBrandImage/", express.static("multimedia/brandsImages"));

//
//
/*end of global api */
//
//

const { Server } = require("socket.io");
const resources = require("./config/resource");

const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["get", "post"],
  },
});

io.on("connection", (socket) => {
  // ...
  // console.log(socket.id);

  socket.on(resources.CHAT.SOCKET_MESSAGE.SEND_MESSAGE, (data) => {
    console.log(`data ${data} sent from client ${socket.id}`);
    console.log(data);

    if (data.sender === resources.CHAT.MANAGER_SENDER)
      io.sockets.emit(
        resources.CHAT.SOCKET_MESSAGE.RECEIVE_MESSAGE_BY_CUSTOMER,
        data
      );
    else
      io.sockets.emit(
        resources.CHAT.SOCKET_MESSAGE.RECEIVE_MESSAGE_BY_MANAGER,
        data
      );
    // socket.to(data.room).emit("receive_message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected : " + socket.id);
  });
  module.exports = socket;
});

httpServer.listen(5000, () => console.log(`server is running on port 5000`));
